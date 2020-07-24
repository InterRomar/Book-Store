const express = require('express');

const { sequelize, Sequelize } = require('../models/index');
const Notification = require('../models/Notification')(sequelize, Sequelize);
const attachCurrentUser = require('../middlewares/attachCurrentUser');
const Category = require('../models/Category')(sequelize, Sequelize);
const Comment = require('../models/Comment')(sequelize, Sequelize);
const Book = require('../models/Book')(sequelize, Sequelize);
const User = require('../models/User')(sequelize, Sequelize);

const router = express.Router();

router.get('/:type', attachCurrentUser, async (req, res) => {
  if (!req.currentUserId) return;

  const currentUser = await User.findByPk(req.currentUserId);
  
  if (req.params.type === 'new-books') {
    if (!currentUser.subscriptions) {
      return res.json({success: false, message: "У данного пользователя пока нет подписок"})
    };



    let notifications = await Notification.findAll({
      where: {
        type: 'NEW_BOOK'
      }
    });
    
    // Остаются только те уведомления, на категории которых пользователь подписан 
    notifications = notifications.filter(n => {
      return currentUser.subscriptions.includes(n.category_id) && !n.isViewed;
    })
    for (let i = 0; i < notifications.length; i++) {
      const book = await Book.findByPk(notifications[i].book_id);
      const category = await Category.findByPk(notifications[i].category_id);
      const user = await User.findByPk(notifications[i].user_id);

      const newNotification = {
        id: notifications[i].id,
        isViewed: false,
        type: notifications[i].type,
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
        },
        category: {
          id: category.id,
          title: category.title
        }
      }
      notifications[i] = newNotification;
    }
    res.json({success: true, notifications})
  }
  
  if (req.params.type === 'mentions') {
    
    let notifications = await Notification.findAll({
      where: {
        type: 'MENTION',
        target_user_id: req.currentUserId
      }
    });
    notifications = notifications.filter(n => !n.isViewed)
    
    for (let i = 0; i < notifications.length; i++) {
      const user = await User.findByPk(notifications[i].user_id);

      const newNotification = {
        id: notifications[i].id,
        isViewed: false,
        type: notifications[i].type,
        user: {
          id: user.id,
          email: user.email,
        },
      }
      notifications[i] = newNotification;
    }
    res.json({success: true, notifications})
  } 
});

router.put('/', async (req, res) => {
  const notification = await Notification.update({isViewed: true}, {
    where: {
      id: req.body.id
    }
  })

  res.json({success: true, notification_id: req.body.id})
});

module.exports = router;