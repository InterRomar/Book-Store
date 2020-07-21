'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    
    static associate(models) {
      
    }
  };
  Notification.init({
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    isViewed: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps: true,
    modelName: 'notification',
  });
  return Notification;
};