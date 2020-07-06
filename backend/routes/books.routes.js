const express = require('express');

const { sequelize, Sequelize } = require('../models/index');
const User = require('../models/User')(sequelize, Sequelize);
const Book = require('../models/Book')(sequelize, Sequelize);

const router = express.Router();

router.get('/getUserBooks', async (req, res) => {
    const user = await User.findByPk(req.body.id);

    console.log(req.body.id);

    res.status(200).json({success: true})
    
    // const books = await user.getBooks();
    // console.log(books);
    
});

router.post('/addBook', async (req, res) => {
    const {
        title,
        author,
        description,
        price,
        rating,
        img,
        demo_fragment,
        userID,
    } = req.body;

    const newBook = await Book.create({
        title,
        author,
        description,
        price,
        rating,
        img,
        demo_fragment,
        userID,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    
    res.status(200).json({
        success: true,
        message: 'New book has been created!'
    })
});


module.exports = router;