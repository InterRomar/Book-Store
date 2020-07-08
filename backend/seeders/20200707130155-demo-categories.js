'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [{
      title: 'Бизнес',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Наука',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'IT',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Фантастика',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Психология',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Учебная литература',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Религия и Эзотерика',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Путешествия',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Исскуство и дизайн',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});

  }
};
