'use strict';
const {
  Model
} = require('sequelize');
const User = require('./User');
const Category = require('./Category');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {

    static associate(models) {
      Book.belongsTo(models.User, {foreignKey: 'ID', as: 'Book'});
    }
  };
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    rating: DataTypes.NUMBER,
    img: DataTypes.STRING,
    demo_fragment: DataTypes.STRING,
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: User,
          key: "UserID"
      }
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: Category,
          key: "CategoryID"
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