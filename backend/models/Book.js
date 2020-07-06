'use strict';
const {
  Model
} = require('sequelize');
const User = require('./User');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {

    static associate(models) {
      Book.belongsTo(models.User, {foreignKey: 'ID', as: 'Book'});
    }
  };
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMBER,
    rating: DataTypes.NUMBER,
    img: DataTypes.STRING,
    demo_fragment: DataTypes.STRING,
    UserID: {
      type: DataTypes.INTEGER,
      references: {
          model: User,
          key: "UserID"
      }
    },
  
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      default: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      default: new Date()
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};