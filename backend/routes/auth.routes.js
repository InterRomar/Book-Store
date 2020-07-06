const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

const { sequelize, Sequelize } = require('../models/index');
const User = require('../models/User')(sequelize, Sequelize);
const isAuth = require('../middlewares/isAuth');
const attachCurrentUser = require('../middlewares/attachCurrentUser')

const router = express.Router();
const salt = bcrypt.genSaltSync(10);

function generateToken(user) {

  const data =  {
    id: user.id,
    email: user.email,
    createdAt: new Date().getTime()
  };
  
  const expiration = 10;

  return jwt.sign({ data }, config.get("secretKey"), { expiresIn: expiration });
  
}

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
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const token = generateToken(newUser);
    

    return res.status(200).json({
      success: true, 
      message: 'Успешно!', 
      user: { email }, 
      token: `Fusion ${token}`
  });
  } catch (error) { 
    console.log(error)
    return res.status(500).json({ success: false, message: `Что-то пошло не так, повторите попытку... ${error}`});
  }
});

router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = await jwt.verify(token, config.get('secretKey'))
    

    const tokenLifetime = new Date().getTime() - decodedToken.data.createdAt;
    if (tokenLifetime >= decodedToken.exp) {
      res.json({
        success: false,
        message: "token is expired"
      })
    }
    return res.json({
      user: decodedToken.data,
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
        currentUser: { id: candidate.id, email: candidate.email }
      });
    } catch (error) { 
      return res.status(500).json({ success: false, message: `Что-то пошло не так, повторите попытку... ${error}`});
    }
});
module.exports = router;