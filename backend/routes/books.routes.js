const express = require('express');
const { Op } = require('sequelize');

const { sequelize, Sequelize } = require('../models/index');
const User = require('../models/User')(sequelize, Sequelize);
const Book = require('../models/Book')(sequelize, Sequelize);
const Comment = require('../models/Comment')(sequelize, Sequelize);
const Category = require('../models/Category')(sequelize, Sequelize);
const Rating = require('../models/Rating')(sequelize, Sequelize);
const Notification = require('../models/Notification')(sequelize, Sequelize);
const attachCurrentUser = require('../middlewares/attachCurrentUser')
const upload = require('../middlewares/upload');
const userFromToken = require('../middlewares/userFromToken');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let { page, size, category, from, to, rating, sorting } = req.query;
    if (Object.keys(req.query).length === 0) {
      page = 1;
      size = 10;
    }
    const whereObject = {};
    let orderTemplate = [];
    
    switch (sorting) {
      case 'minRating':
        orderTemplate = [sequelize.fn('max', sequelize.col('rating')), 'ASC']  
        break;
      case 'maxRating':
        orderTemplate = [sequelize.fn('max', sequelize.col('rating')), 'DESC']  
        break;
      case 'minPrice':
        orderTemplate = [sequelize.fn('max', sequelize.col('price')), 'ASC'];  
        break;
      case 'maxPrice':
        orderTemplate = [sequelize.fn('max', sequelize.col('price')), 'DESC'];
        break;
      case 'title':
        orderTemplate = ['title']    
        break;
      case 'author':
        orderTemplate = ['author']    
        break;

      default:
        orderTemplate = [];
        break;
    }
    category ? whereObject.category_id = category : null;
    rating ? whereObject.rating = {
      [Op.gte]: rating
    } : null;
    from !== undefined && to !== undefined ? whereObject.price = {
      [Op.between]: [from, to]
    } : null;
    
    const allBooks = await Book.findAll({
      where: {
        ...whereObject
      }
    });
    const totalCount = allBooks.length;
    const books = await Book.findAll({
      where: {
        ...whereObject
      },
      group: ['book.id'],
      offset: size * (page - 1),
      limit: size,
      order: orderTemplate.length ? [orderTemplate] : [],
    });

    res.status(200).json({success: true, books, totalCount })

  } catch (error) {
    console.log(error.message)
    res.status(500).json({success: false, message: "Что-то пошло не так, повторите попытку"})
  }
});

router.post('/set-rating', async (req, res) => {
  const { bookID, userID, newRating } = req.body;
  
  const book = await Book.findByPk(bookID);
  const rating = await Rating.findOne({where: {book_id: bookID}});

  const overallRating = ((book.rating * rating.user_id.length) + newRating) / (rating.user_id.length + 1);
  
  await Book.update({rating: overallRating}, {
    where: {
      id: bookID
    }
  })
  await Rating.update({user_id: [ ...rating.user_id, userID]}, {
    where: {
      book_id: bookID
    }
  })

  res.json({
    success: true, 
    data: {
      rating: String(overallRating),
      isAppreciated: true
    }
  });

});

router.post('/set-comment', attachCurrentUser, async (req, res) => {
  const { book_id, text, answerTo } = req.body;  
  const newComment = await Comment.create({
    book_id,
    text,
    answerTo,
    user_id: req.currentUserId
  });

  const target_comment = await Comment.findByPk(answerTo); 
  
  const user = await User.findByPk(req.currentUserId);
  newComment.user_id = user;
  
  const book = await Book.findByPk(book_id);
  await Book.update({
    comments: book.comments ? [ ...book.comments, newComment.id ] : [newComment.id]
  }, {
    where: {
      id: book_id
    }
  });

  if (target_comment) {
    //Здесь создаю новое уведомление в БД
    const notification = await Notification.create({
      type: 'MENTION',
      user_id: req.currentUserId,
      target_id: answerTo,
      target_user_id: target_comment.user_id,
      isViewed: false
    });
    const newNotification = {
      id: notification.id,
      type: notification.type,
      isViewed: false,
      user: {
        id: user.id,
        email: user.email,
      },
    }    
    req.io.to(target_comment.user_id).emit('mentionAdded', newNotification);
  }
  
  
  res.json({success: true, comment: newComment, target_user_id: target_comment ? target_comment.user_id : null})
});

router.get('/:id', userFromToken, async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(400).json({ success: false, message: 'Книга не найдена.'})
    }
    const comments = await Comment.findAll({
      where: {
        book_id: id
      },
      group: ['comment.id'],
      order: [[sequelize.fn('max', sequelize.col('createdAt')), 'DESC']]
    })
  
    for (const comment of comments) {
      const user = await User.findByPk(comment.user_id);
      comment.user_id = {
        email: user.email,
        avatar: user.avatar,
        id: user.id
      };
    }  


    let isAppreciated = true;
    let isFavorite = false;
    
    if (req.currentUser) {
      const userID = req.currentUser.id;
      const rating = await Rating.findByPk(id);
      isAppreciated = rating.user_id.includes(userID);          
      
      if (req.currentUser.favorite) {
        isFavorite = req.currentUser.favorite.includes(Number(id))
      }
    }   
   
    res.status(200).json({success: true, book, isAppreciated, isFavorite, comments});   
  } catch (error) {
      console.log(error)
      res.status(500).json({success: false, message: "Что-то пошло не так, повторите попытку" })
  }
});

router.post('/', attachCurrentUser, upload, async (req, res) => {
  try {
    const { title,
      author,
      description,
      price,
      demo_fragment,
      user_id,
      category_id } = req.body;
    const potentialBook = await Book.findOne({ where: { title }});

    if (potentialBook) {
      return res.status(400).json({ success: false, message: "Книга с таким названием уже существует."})
    }
    
    const newBook = await Book.create({
      title,
      author,
      description,
      price,
      demo_fragment,
      user_id,
      category_id
    });
    const newRating = await Rating.create({
      book_id: newBook.id,
      user_id: []
    })
    
    //Здесь создаю новое уведомление в БД
    const notification = await Notification.create({
      type: 'NEW_BOOK',
      book_id: newBook.id,
      user_id,
      category_id,
      isViewed: false
    });

    const user = await User.findByPk(user_id);
    const category = await Category.findByPk(category_id);
    const newNotification = {
      id: notification.id,
      type: notification.type,
      isViewed: false,
      user: {
        id: user.id,
        email: user.email,
        subscriptions: user.subscriptions,
        avatar: user.avatar
      },
      book: {
        id: newBook.id,
        title: newBook.title,
        author: newBook.author,
        category: newBook.category_id,
        price: newBook.price
      },
      category: {
        id: category.id,
        title: category.title
      }
    }

    // Дальше отправляю его клиентам
    req.io.emit('bookAdded', newNotification)
    
    res.status(200).json({
      success: true,
      message: 'New book has been created!',
      book: newBook
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: "Что-то пошло не так, повторите попытку"})
  }
});

router.post('/upload-cover/:id', attachCurrentUser, upload, async (req, res) => {  
  try {
    const filedata = req.file;
  
    const dbRes = await Book.update({img: filedata.filename}, {
      where: {
        id: req.params.id
      }
    })

    if (!filedata) throw new Error();
    res.status(200).json({ success: true, message: 'Обложка успешно добавлена!', img: filedata.filename})
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Что-то пошло не так, повторите попытку!' });
  }
});

module.exports = router;