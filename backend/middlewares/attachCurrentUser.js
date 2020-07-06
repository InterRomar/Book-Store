const { sequelize, Sequelize } = require("../models");

const User = require("../models/User")(sequelize, Sequelize);

const attachCurrentUser = async (req, res, next) => {
    const decodedTokenData = req.token.data;
    const userRecord = await User.findByPk(decodedTokenData.id);
   
     req.currentUser = userRecord;
   
    if(!userRecord) {
      return res.status(401).end('User not found')
    } else {
      return next();
    
   }
}

module.exports = attachCurrentUser