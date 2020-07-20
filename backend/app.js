const express = require('express');
const jsonParser = express.json();
const http = require('http');
const socketIO = require("socket.io");

const app = express();
const db = require('./models/index');
const { response } = require('express');
const { sequelize, Sequelize } = db;
const User = require('./models/User')(sequelize, Sequelize);

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

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({message: 'invalid token...'});
  }
});

io.on('connection', socket => {
  const browser = socket.handshake.headers['user-agent'].split(' ').slice(-1).join('');
  // console.log(browser)

  socket.on('addBook',(addData)=>{
		var todoItem = new todoModel({
			itemId:addData.id,
			item:addData.item,
			completed: addData.completed
		})

    io.emit('bookAdded',addData)

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