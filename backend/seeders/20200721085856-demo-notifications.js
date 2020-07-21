'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('notifications', [
      {
        book_id: 1,
        user_id: 1,
        category_id: 4, 
        isViewed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        book_id: 2,
        user_id: 1,
        category_id: 2,
        isViewed: false, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        book_id: 24,
        user_id: 1,
        category_id: 1,
        isViewed: false, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        book_id: 87,
        user_id: 3,
        category_id: 7,
        isViewed: false, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        book_id: 96,
        user_id: 6,
        category_id: 6, 
        isViewed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        book_id: 28,
        user_id: 8,
        category_id: 8, 
        isViewed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        book_id: 14,
        user_id: 1,
        category_id: 3,
        isViewed: false, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        book_id: 71,
        user_id: 5,
        category_id: 4,
        isViewed: false, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('notifications', null, {});
  }
};
