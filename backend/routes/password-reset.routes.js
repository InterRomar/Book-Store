const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

const { sequelize, Sequelize } = require('../models/index');
const User = require('../models/User')(sequelize, Sequelize);


const router = express.Router();

function generateTokenForPasswordReset(data) {

  const payload =  {
    

    createdAt: new Date().getTime()
  };
  
  const expiration = '12h';

  return jwt.sign({ payload }, config.get("secretKey"), { expiresIn: expiration });
  
}


router.post('/link-request', async (req, res) => {
  const { user_email } = req.body;

  console.log(req.body)
  const user = await User.findOne({
    where: {
      email: user_email
    }
  });
  if (!Object.keys(user).length) {
    res.json({success: false, message: 'Пользователь с таким email не найден'});
  }

  const data = {
    email: user_email,
    password: user.password,
    createdAt: new Date().getTime() 
  }
  const token = jwt.sign({ data }, config.get("secretKey"), { expiresIn: '1h' });
  // 1595385121
  
  
  res.json({token})
});

router.post('/token-verification', async (req,res) => {
  try {
    const { token } = req.body;
    const decodedToken = jwt.verify(token, config.get("secretKey"));
    
    const tokenLifeСycle = new Date().getTime() - decodedToken.data.createdAt;
    if (tokenLifeСycle >= decodedToken.exp) {
      return res.json({success: false, message: "Срок действия ссылки истёк, повторите попытку."})
    }
    const user = await User.findOne({
      where: {
        email: decodedToken.data.email
      }
    });
    
    if (user.password === decodedToken.data.password) {
      console.log(2)
      return res.json({success: true});
    }
  } catch (error) {
    console.log(error.message);
    return res.json({success: false, message: 'Ссылка недействительна, повторите попытку.'})
  }


});

module.exports = router;