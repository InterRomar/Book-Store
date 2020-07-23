const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

const { sequelize, Sequelize } = require('../models/index');
const User = require('../models/User')(sequelize, Sequelize);
const attachCurrentUser = require('../middlewares/attachCurrentUser')
const upload = require('../middlewares/upload');
const salt = require('../middlewares/getSalt');
const Book = require('../models/Book')(sequelize, Sequelize);

const router = express.Router();

function generateToken(user) {

  const data =  {
    id: user.id,
    email: user.email,
    createdAt: new Date().getTime()
  };
  
  const expiration = '1h';

  return jwt.sign({ data }, config.get("secretKey"), { expiresIn: expiration });
  
}

router.post('/add-favorite', async (req, res) => {
  const { user_id, book_id } = req.body;
  const user = await User.findByPk(user_id)
  
  await User.update({
    favorite: user.favorite ? [ ...user.favorite, book_id ] : [book_id]
  }, {
    where: {
      id: user_id
    }
  });

  res.json({success: true})
});
router.post('/remove-favorite', attachCurrentUser, async (req, res) => {
  const book_id = req.body.id;
  const user = await User.findByPk(req.currentUserId);
  
  
  await User.update({
    favorite: user.favorite.filter(id => id !== book_id)
  }, {
    where: {
      id: req.currentUserId
    }
  })

  res.json({success: true, id: book_id})
});
router.post('/reg', async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return res.status(401).json({success: false, message: 'Пользователь с таким email уже существует!'})
    }
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      email,
      password: hashPass,
    });
    const token = generateToken(newUser);
    

    return res.status(200).json({
      success: true, 
      message: 'Успешно!', 
      user: { email, id: newUser.id }, 
      token: `Fusion ${token}`
  });
  } catch (error) { 
    console.log(error.message)
    return res.status(500).json({ success: false, message: `Что-то пошло не так, повторите попытку... ${error}`});
  }
});
router.get('/profile', attachCurrentUser, async (req, res) => {
  try {
    const user = await User.findByPk(Number(+req.currentUserId));
    if (!user) throw new Error('user not found');
    return res.json({
      user: {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        subscriptions: user.subscriptions
      },
      success: true
    });
  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: error.message })
  }
});
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ where: { email } });
      

      if (!candidate) {
        return res.status(401).json({success: false, message: 'пользователя с таким email не существует!'})
      }

      const isCorrectPass = await new Promise((res) => {
        bcrypt.compare(password, candidate.password, (err, result) => {
          res(result)
        })
      });
      
      if (!isCorrectPass) {
        return res.status(401).json({success: false, message: 'Неверный пароль повторите попытку!'})
      }
      
      const token = generateToken(candidate);
      
      return res.status(200).json({
        success: true, 
        message: 'Успешно!', token: `Fusion ${token}`, 
        currentUser: { id: candidate.id, email: candidate.email, avatar: candidate.avatar, subscriptions: candidate.subscriptions }
      });
    } catch (error) { 
      return res.status(500).json({ success: false, message: `Что-то пошло не так, повторите попытку... ${error}`});
    }
});
router.get('/favorite', attachCurrentUser, async (req, res) => {
  const user = await User.findByPk(req.currentUserId);
  if (!user.favorite) {
    return res.json({success: true, books: []})
  }
  const favoriteBooks = []; 
  for (const id of user.favorite) {
    const book = await Book.findByPk(id);    
    favoriteBooks.push(book);

  }  
  return res.json({success: true, books: favoriteBooks})
  
  
  
})
router.post('/upload-avatar', attachCurrentUser, upload, async (req, res) => {

  try {
    const filedata = req.file;
  
    const dbRes = await User.update({avatar: filedata.filename}, {
      where: {
        id: req.currentUserId
      }
    })

    if (!filedata) throw new Error();
    res.status(200).json({ success: true, message: 'Аватар успешно установлен!', avatar: filedata.filename})
  } catch (error) {
    res.status(500).json({ success: false, message: 'Что-то пошло не так, повторите попытку!' });
  }
})

module.exports = router;