'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comments', [{
      book_id: 1,
      user_id: 1,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 1,
      user_id: 2,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 1,
      user_id: 3,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 1,
      user_id: 4,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 1,
      user_id: 5,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 2,
      user_id: 1,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 2,
      user_id: 5,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 2,
      user_id: 7,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 2,
      user_id: 3,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 2,
      user_id: 8,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 4,
      user_id: 5,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 4,
      user_id: 6,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 4,
      user_id: 7,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      book_id: 4,
      user_id: 1,
      text: `Maecenas egestas imperdiet mauris sed egestas. Proin condimentum risus non arcu consectetur, et malesuada est dignissim. Sed quis metus eget odio imperdiet placerat. Proin ultrices gravida posuere. Etiam lacus mauris, cursus consequat lorem non, malesuada blandit tortor. Nunc mattis ultrices.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
