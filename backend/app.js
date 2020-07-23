const express = require('express');
const jsonParser = express.json();
const http = require('http');
const socketIO = require("socket.io");

const app = express();
const db = require('./models/index');
const { sequelize, Sequelize } = db;
const Category = require('./models/Category')(sequelize, Sequelize);
const User = require('./models/User')(sequelize, Sequelize);
const Notification = require('./models/Notification')(sequelize, Sequelize);

const server = http.createServer(app);

const io = socketIO(server);

app.use(jsonParser);
app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");  
  next();
});
app.use('/auth', require('./routes/auth.routes'));
app.use('/books', require('./routes/books.routes'));
app.use('/category', require('./routes/category.routes'));
app.use('/notifications', require('./routes/notifications.routes'));
app.use('/password-reset', require('./routes/password-reset.routes'));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({message: 'invalid token...'});
  }
});




const sockets_id = [];
io.on('connection', socket => {

  sockets_id.push({
    id: socket.id,
    user_id: socket.handshake.query.user_id
  });

  socket.on('addBook', async (book)=>{
    const { id, user_id, category_id } = book;
    
    //Здесь создаю новое уведомление в БД
    const notification = await Notification.create({
      type: 'NEW_BOOK',
      book_id: id,
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
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category_id,
        price: book.price
      },
      category: {
        id: category.id,
        title: category.title
      }
    }

    // Дальше отправляю его клиентам
    io.emit('bookAdded', newNotification)
	})

  socket.on('addMention', async (mention)=>{
    const { id, user_id, answerTo } = mention;
    
    //Здесь создаю новое уведомление в БД
    const notification = await Notification.create({
      type: 'MENTION',
      user_id: user_id.id,
      target_id: answerTo,
      isViewed: false
    });

    // const user = await User.findByPk(user_id.id);
    const newNotification = {
      id: notification.id,
      type: notification.type,
      isViewed: false,
      user: {
        id: user_id.id,
        email: user_id.email,
      },
    }
    
    // const target = sockets_id.find(s => +s.user_id === answerTo);
    const target = sockets_id.find(s => +s.user_id === answerTo);
    
    console.log(target)
    io.to(target.id).emit('mentionAdded', newNotification)

    

    
	})


})


async function start() {
  try {  
    server.listen(5000, () => {
        console.log('server has been started..')
    });
  } catch (error) {
    console.log('Server error! ' + error.message);
    process.exit(1);
  }
}

start();