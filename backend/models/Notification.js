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
    type: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    target_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    isViewed: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps: true,
    modelName: 'notification',
  });
  return Notification;
};