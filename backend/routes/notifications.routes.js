const express = require('express');

const { sequelize, Sequelize } = require('../models/index');
const Notification = require('../models/Notification')(sequelize, Sequelize);
const attachCurrentUser = require('../middlewares/attachCurrentUser');
const User = require('../models/User')(sequelize, Sequelize);

const router = express.Router();

router.post('/', attachCurrentUser, async (req, res) => {
  const { book_id } = req.body;
  const user = await User.findByPk(req.currentUserId);

  const notification = await Notification.create({
    user_id: req.currentUserId,
    book_id
  })
});


module.exports = router;