'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'kinterov@yandex.ru',
      password: '$2b$10$LoR6gu5MvnmqZrUAwiEGUOM9PQIsZhQM16HsHG0cSWn4UxIIWvxJq',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
