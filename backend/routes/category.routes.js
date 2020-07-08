const express = require('express');

const { sequelize, Sequelize } = require('../models/index');
const Category = require('../models/Category')(sequelize, Sequelize);

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
  
    res.status(200).json({success: true, categories})
  } catch (error) {
    res.status(500).json({success: false, message: "Что-то пошло не так, повторите попытку"})
  }
});

router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Поле обязательно для заполнения!"})
    }
    const potentialCategory = await Category.findOne({ where: { title }});

    if (potentialCategory) {
      return res.status(400).json({ success: false, message: "Такая категория уже существует."})
    }

    const newCategory = await Category.create({
      title,
    });
    
    res.status(200).json({
      success: true,
      message: 'Новая категория была создана!',
      category: newCategory
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: "Что-то пошло не так, повторите попытку"})
  }
});


module.exports = router;