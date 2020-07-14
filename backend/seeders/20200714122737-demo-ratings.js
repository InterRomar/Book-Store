'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ratings', [{
      book_id: 1,
      user_id: [1, 2, 3],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 2,
      user_id: [1, 2, 3, 4],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 3,
      user_id: [3, 4, 5],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 4,
      user_id: [4, 5, 6],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 5,
      user_id: [5, 6, 7],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 6,
      user_id: [6, 7, 8],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 7,
      user_id: [7, 8, 9],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 8,
      user_id: [8, 9, 10],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 9,
      user_id: [9, 10, 1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 10,
      user_id: [10, 1, 2],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 11,
      user_id: [1, 2, 3],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 12,
      user_id: [1, 2, 3, 4],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 13,
      user_id: [3, 4, 5],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 14,
      user_id: [4, 5, 6],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 15,
      user_id: [5, 6, 7],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 16,
      user_id: [6, 7, 8],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 17,
      user_id: [7, 8, 9],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 18,
      user_id: [8, 9, 10],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 19,
      user_id: [9, 10, 1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 20,
      user_id: [10, 1, 2],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 21,
      user_id: [1, 2, 3],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 22,
      user_id: [1, 2, 3, 4],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 23,
      user_id: [3, 4, 5],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 24,
      user_id: [4, 5, 6],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 25,
      user_id: [5, 6, 7],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 26,
      user_id: [6, 7, 8],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 27,
      user_id: [7, 8, 9],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 28,
      user_id: [8, 9, 10],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 29,
      user_id: [9, 10, 1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 30,
      user_id: [10, 1, 2],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 31,
      user_id: [1, 2, 3],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 32,
      user_id: [1, 2, 3, 4],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 33,
      user_id: [3, 4, 5],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 34,
      user_id: [4, 5, 6],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 35,
      user_id: [5, 6, 7],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 36,
      user_id: [6, 7, 8],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 37,
      user_id: [7, 8, 9],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 38,
      user_id: [8, 9, 10],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 39,
      user_id: [9, 10, 1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 40,
      user_id: [10, 1, 2],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 41,
      user_id: [1, 2, 3],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 42,
      user_id: [1, 2, 3, 4],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 43,
      user_id: [3, 4, 5],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 44,
      user_id: [4, 5, 6],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 45,
      user_id: [5, 6, 7],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 46,
      user_id: [6, 7, 8],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 47,
      user_id: [7, 8, 9],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 48,
      user_id: [8, 9, 10],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 49,
      user_id: [9, 10, 1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 50,
      user_id: [10, 1, 2],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 51,
      user_id: [1, 2, 3],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 52,
      user_id: [1, 2, 3, 4],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 53,
      user_id: [3, 4, 5],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 54,
      user_id: [4, 5, 6],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 55,
      user_id: [5, 6, 7],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 56,
      user_id: [6, 7, 8],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 57,
      user_id: [7, 8, 9],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 58,
      user_id: [8, 9, 10],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 59,
      user_id: [9, 10, 1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 60,
      user_id: [10, 1, 2],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 61,
      user_id: [1, 2, 3],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 62,
      user_id: [1, 2, 3, 4],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 63,
      user_id: [3, 4, 5],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 64,
      user_id: [4, 5, 6],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 65,
      user_id: [5, 6, 7],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 66,
      user_id: [6, 7, 8],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 67,
      user_id: [7, 8, 9],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 68,
      user_id: [8, 9, 10],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 69,
      user_id: [9, 10, 1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 70,
      user_id: [10, 1, 2],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 71,
      user_id: [1, 2, 3],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 72,
      user_id: [1, 2, 3, 4],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 73,
      user_id: [3, 4, 5],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 74,
      user_id: [4, 5, 6],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 75,
      user_id: [5, 6, 7],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 76,
      user_id: [6, 7, 8],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 77,
      user_id: [7, 8, 9],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 78,
      user_id: [8, 9, 10],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 79,
      user_id: [9, 10, 1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 80,
      user_id: [10, 1, 2],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 81,
      user_id: [1, 2, 3],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 82,
      user_id: [1, 2, 3, 4],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 83,
      user_id: [3, 4, 5],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 84,
      user_id: [4, 5, 6],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 85,
      user_id: [5, 6, 7],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 86,
      user_id: [6, 7, 8],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 87,
      user_id: [7, 8, 9],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 88,
      user_id: [8, 9, 10],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 89,
      user_id: [9, 10, 1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 90,
      user_id: [10, 1, 2],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 91,
      user_id: [1, 2, 3],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 92,
      user_id: [1, 2, 3, 4],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 93,
      user_id: [3, 4, 5],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 94,
      user_id: [4, 5, 6],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 95,
      user_id: [5, 6, 7],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 6,
      user_id: [6, 7, 8],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 97,
      user_id: [7, 8, 9],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 98,
      user_id: [8, 9, 10],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 99,
      user_id: [9, 10, 1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 100,
      user_id: [10, 1, 2],
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ratings', null, {});
  }
};
