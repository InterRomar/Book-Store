const jwt = require('jsonwebtoken');
const config = require('config');

const { sequelize, Sequelize } = require("../models");
const User = require("../models/User")(sequelize, Sequelize);



const userFromToken = async (req, res, next) => {
  const getTokenFromHeader = (req) => {
      if (req.headers.authorization) {
        return req.headers.authorization;
      } 
      return null;  
  }
  const token = getTokenFromHeader(req);
  if (!token) {
    return next();
  }

  const decodedToken = await jwt.verify(token, config.get('secretKey'));
  const user = await User.findByPk(decodedToken.data.id);
  req.currentUser = user;
  return next();
}

module.exports = userFromToken