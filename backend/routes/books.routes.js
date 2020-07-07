const express = require('express');

const { sequelize, Sequelize } = require('../models/index');
const User = require('../models/User')(sequelize, Sequelize);
const Book = require('../models/Book')(sequelize, Sequelize);

const router = express.Router();

router.get('/getUserBooks', async (req, res) => {
  try {
    const user = await User.findByPk(req.body.id);
    const books = await user.getBooks();
    
    res.status(200).json({success: true, books})   
  } catch (error) {
      res.status(500).json({success: false, message: "Что-то пошло не так, повторите попытку"})
  }
});
router.get('/getAllBooks', async (req, res) => {
  try {
    const books = await Book.findAll();
  
    res.status(200).json({success: true, books})
  } catch (error) {
    res.status(500).json({success: false, message: "Что-то пошло не так, повторите попытку"})
  }
});

router.post('/addBook', async (req, res) => {
  try {
    const { title } = req.body;
    const potentialBook = await Book.findOne({ where: { title }});

    if (potentialBook) {
      return res.status(400).json({ success: false, message: "Книга с таким названием уже существует."})
    }

    const newBook = await Book.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
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