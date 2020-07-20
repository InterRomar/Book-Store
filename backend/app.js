const express = require('express');
const jsonParser = express.json();
const http = require('http');
const socketIO = require("socket.io");

const app = express();
const db = require('./models/index');
const { response } = require('express');
const { sequelize, Sequelize } = db;
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

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({message: 'invalid token...'});
  }
});

io.on('connection', socket => {
  const browser = socket.handshake.headers['user-agent'].split(' ').slice(-1).join('');
  console.log(browser)

  socket.on('addBook', async (book)=>{
    const { id, user_id } = book;
    
    //Здесь создаю новое уведомление в БД
    const notification = await Notification.create({
      book_id: id,
      user_id
    });

    const user = await User.findByPk(user_id);
    const newNotification = {
      id: notification.id,
      user: {
        id: user.id,
        email: user.email,
        avatar: user.avatar
      },
      book: {
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category_id,
        price: book.price
      }
    }

    // Дальше отправляю его клиентам
    io.emit('bookAdded', newNotification)

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