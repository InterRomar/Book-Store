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

  try {
    const decodedToken = await jwt.verify(token, config.get('secretKey'));
    req.currentUserId = decodedToken.data.id;
    return next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: error.message
      })
    }
  } 
}

module.exports = attachCurrentUser