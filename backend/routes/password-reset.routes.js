const express = require('express');
const bcrypt = require('bcrypt');
const createHash = require('hash-generator');

const salt = require('../middlewares/getSalt');
const { sequelize, Sequelize } = require('../models/index');
const User = require('../models/User')(sequelize, Sequelize);
const PasswordReset = require('../models/PasswordReset')(sequelize, Sequelize);
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test.interov@gmail.com', 
    pass: 'InterTest123',
  },
});

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, new_password } = req.body;
    const hashPass = bcrypt.hashSync(new_password, salt);

    const user = await User.update({password: hashPass}, {
      where: {
        email: email
      }
    });

    res.json({success: true, email, password: new_password});
  } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message});
  }
});

router.post('/link-request', async (req, res) => {
  const { user_email } = req.body;

  const user = await User.findOne({
    where: {
      email: user_email
    }
  });
  if (!user) {
    return res.json({success: false, message: 'Пользователь с таким email не найден'});
  }

  const hash = createHash(30);
  const exp = new Date().getTime() + 43200000; // Ссылка действительна в течение 12ти часов с момента генерации
  const newPasswordReset = await PasswordReset.create({
    hash,
    untilAt: new Date(exp),
    done: false,
    user_id: user.id
  });


  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', 
    to: user_email, 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: `<b>http://localhost:3000/password-reset/${hash}</b>`, 
  });

  res.json({success: true, message: 'Письмо с ссылкой было отправлено на ' + user_email})
});

router.post('/hash-verification', async (req,res) => {
  try {
    const { hash } = req.body;
    
    const passwordReset = await PasswordReset.findOne({
      where: {
        hash
      }
    });
    
    if (!passwordReset) throw new Error();
    if (passwordReset.done) throw new Error();

    if (Date.now >= passwordReset.untilAt.getTime()) {
      return res.json({
        success: false, 
        message: "Срок действия ссылки истёк, повторите попытку."
      })
    }
    const user = await User.findByPk(passwordReset.user_id);

    await PasswordReset.update({done: true}, {
      where: {
        hash
      }
    })
    return res.json({success: true, email: user.email});
  
  } catch (error) {
    console.log(error.message);
    return res.json({success: false, message: 'Ссылка недействительна, повторите попытку.'})
  }


});

module.exports = router;