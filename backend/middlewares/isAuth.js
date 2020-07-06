
const jwt = require('express-jwt');
const config = require('config');

const getTokenFromHeader = (req) => {
  console.log(req.headers.authorization)
    if (req.headers.authorization) {
      return req.headers.authorization;
    } 
    return null;  
}

const isAuth = jwt({
    secret: config.get('secretKey'),
    algorithms: ['HS256'],
    userProperty: 'token',
    getToken: getTokenFromHeader, 
});

module.exports = isAuth