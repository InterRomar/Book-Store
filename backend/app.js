const express = require('express');
const jsonParser = express.json();
const http = require('http');
const socketIO = require("socket.io");
const app = express();

const server = http.createServer(app);

const io = socketIO(server);
app.use(jsonParser);
app.use(express.static('public'));

app.use(function (req, res, next) {
  req.io = io;
  next();
})
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


io.on('connection', socket => {
  socket.on('userJoined', (data) => {
    
    socket.join(String(data.room));
    const message = `user ${socket.id} has connected to the ${data.room} room`;
    io.to(data.room).emit('onUserJoined', message)
  })

  // socket.on('addBook', async (book)=>{

	// })

  // socket.on('addMention', async (mention)=>{
    
	// });
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