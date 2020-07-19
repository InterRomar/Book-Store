'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {

    }
  };
  Comment.init({
    book_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    text: DataTypes.TEXT
  }, {
    sequelize,
    timestamps: true,
    modelName: 'comment',
  });
  return Comment;
};