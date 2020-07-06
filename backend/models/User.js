'use strict';

const {
  Model
} = require('sequelize');
const Book = require('./Book');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Book, {foreignKey: 'userID', as: 'User'})
    }

    async getBooks() {
      const books = await Book.find({
        where: {
          userID: this.id
        }
      });

      return books;
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
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
    modelName: 'User',
  });
  return User;
};