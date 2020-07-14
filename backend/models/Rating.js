'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
    }
  };
  Rating.init({
    book_id: DataTypes.INTEGER,
    user_id: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    timestamps: true,
    modelName: 'rating',
  });
  return Rating;
};