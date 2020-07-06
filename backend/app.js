const express = require('express');
const jsonParser = express.json();
const app = express();
const db = require('./models/index');
const { sequelize, Sequelize } = db;

app.use(jsonParser);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();
});
app.use('/auth', require('./routes/auth.routes'))

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({message: 'invalid token...'});
  }
});


const User = require('./models/User')(sequelize, Sequelize);


async function start() {
  try {  
    app.listen(5000, () => {
        console.log('server has been started..')
    });
  } catch (error) {
    console.log('Server error! ' + error.message);
    process.exit(1);
  }
}

// sequelize.sync().then(result=>{
//     console.log('result');
// })
// .catch(err=> console.log(err));

start();