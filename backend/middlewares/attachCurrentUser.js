const jwt = require('jsonwebtoken');
const config = require('config');

const { sequelize, Sequelize } = require("../models");
const User = require("../models/User")(sequelize, Sequelize);


const attachCurrentUser = async (req, res, next) => {
  const getTokenFromHeader = (req) => {
      if (req.headers.authorization) {
        return req.headers.authorization;
      } 
      return null;  
  }
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ success: false,  message: 'User not found' });

  const decodedToken = await jwt.verify(token, config.get('secretKey'));
  const tokenLifetime = new Date().getTime() - decodedToken.data.createdAt;
  
  if (tokenLifetime >= decodedToken.exp) {
    return res.status(401).json({
      success: false,
      message: "token is expired"
    })
  }
  req.currentUserId = decodedToken.data.id;
  return next();
}

module.exports = attachCurrentUser