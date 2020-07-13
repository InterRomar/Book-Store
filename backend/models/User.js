'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Book = require('./Book')(sequelize, DataTypes);
  class User extends Model {

    static associate(models) {
      User.hasMany(models.book, {foreignKey: 'user_id', as: 'User'})
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'user',
  });
  return User;
};