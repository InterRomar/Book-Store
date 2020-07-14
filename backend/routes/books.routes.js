const express = require('express');
const { Op } = require('sequelize');

const { sequelize, Sequelize } = require('../models/index');
const User = require('../models/User')(sequelize, Sequelize);
const Book = require('../models/Book')(sequelize, Sequelize);
const Rating = require('../models/Rating')(sequelize, Sequelize);
const attachCurrentUser = require('../middlewares/attachCurrentUser')
const upload = require('../middlewares/upload');
const Category = require('../models/Category')(sequelize, Sequelize);;

const router = express.Router();

router.get('/test/:id', async (req, res) => {
  const rating = await Rating.update({user_id: [ ...user_id, ]});
  
  console.log(rating)
  res.json({rating})
})

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


router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(400).json({ success: false, message: 'Книга не найдена.'})
    }

    res.status(200).json({success: true, book})   
  } catch (error) {
      console.log(error)
      res.status(500).json({success: false, message: "Что-то пошло не так, повторите попытку" })
  }
});

router.post('/', attachCurrentUser, upload, async (req, res) => {
  try {
    const { title } = req.body;
    console.log(req.file)
    const potentialBook = await Book.findOne({ where: { title }});

    if (potentialBook) {
      return res.status(400).json({ success: false, message: "Книга с таким названием уже существует."})
    }

    const newBook = await Book.create({
      ...req.body,
    });
    
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
    console.log(dbRes)

    if (!filedata) throw new Error();
    res.status(200).json({ success: true, message: 'Обложка успешно добавлена!', img: filedata.filename})
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Что-то пошло не так, повторите попытку!' });
  }
});

module.exports = router;