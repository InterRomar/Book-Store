const express = require('express');

const { sequelize, Sequelize } = require('../models/index');
const User = require('../models/User')(sequelize, Sequelize);
const Book = require('../models/Book')(sequelize, Sequelize);
const attachCurrentUser = require('../middlewares/attachCurrentUser')


const router = express.Router();

router.get('/testUrl', async (req, res) => {
  try {
    
    const { page, size } = req.query
    const allBooks = await Book.findAll();
    const totalCount = allBooks.length;

    const books = await Book.findAll({
      offset: size * (page - 1),
      limit: size
    })
    
    res.status(200).json({success: true, books, totalCount })

  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: "Что-то пошло не так, повторите попытку"})
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({success: true, books})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: "Что-то пошло не так, повторите попытку"})
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const books = await user.getBooks();
    
    res.status(200).json({success: true, books})   
  } catch (error) {
      console.log(error)
      res.status(500).json({success: false, message: "Что-то пошло не так, повторите попытку" })
  }
});
// router.get('/', async (req, res) => {
//   try {
//     // const { category, price, page, limit } = req.query;
    
    
    
//     res.json({success: true, books})
//   } catch (error) {
//     res.status(500).json({success: false, message: "Что-то пошло не так, повторите попытку"})
//   }
// });

router.post('/', attachCurrentUser, async (req, res) => {
  try {
    const { title } = req.body;
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


module.exports = router;