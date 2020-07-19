'use strict';
const {
  Model
} = require('sequelize');
const User = require('./User');
const Category = require('./Category');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {

    static associate(models) {
      Book.belongsTo(models.user, {foreignKey: 'id', as: 'Book'});
      Book.belongsTo(models.category, {foreignKey: 'id', as: 'CategoryBook'});
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
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL,
      defaultValue: 3.5
    },
    img: DataTypes.STRING,
    demo_fragment: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "users",
          key: "user_id"
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "categories",
          key: "category_id"
      }
    },
    comments: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    timestamps: true,
    modelName: 'book',
  });
  return Book;
};