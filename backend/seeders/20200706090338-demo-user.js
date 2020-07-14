'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'kinterov@yandex.ru',
      password: '$2b$10$LoR6gu5MvnmqZrUAwiEGUOM9PQIsZhQM16HsHG0cSWn4UxIIWvxJq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin1@admin.ru',
      password: '$2b$10$LoR6gu5MvnmqZrUAwiEGUOM9PQIsZhQM16HsHG0cSWn4UxIIWvxJq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin2@admin.ru',
      password: '$2b$10$LoR6gu5MvnmqZrUAwiEGUOM9PQIsZhQM16HsHG0cSWn4UxIIWvxJq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin3@admin.ru',
      password: '$2b$10$LoR6gu5MvnmqZrUAwiEGUOM9PQIsZhQM16HsHG0cSWn4UxIIWvxJq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin4@admin.ru',
      password: '$2b$10$LoR6gu5MvnmqZrUAwiEGUOM9PQIsZhQM16HsHG0cSWn4UxIIWvxJq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin5@admin.ru',
      password: '$2b$10$LoR6gu5MvnmqZrUAwiEGUOM9PQIsZhQM16HsHG0cSWn4UxIIWvxJq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin6@admin.ru',
      password: '$2b$10$LoR6gu5MvnmqZrUAwiEGUOM9PQIsZhQM16HsHG0cSWn4UxIIWvxJq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin7@admin.ru',
      password: '$2b$10$LoR6gu5MvnmqZrUAwiEGUOM9PQIsZhQM16HsHG0cSWn4UxIIWvxJq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin8@admin.ru',
      password: '$2b$10$LoR6gu5MvnmqZrUAwiEGUOM9PQIsZhQM16HsHG0cSWn4UxIIWvxJq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin9@admin.ru',
      password: '$2b$10$LoR6gu5MvnmqZrUAwiEGUOM9PQIsZhQM16HsHG0cSWn4UxIIWvxJq',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
