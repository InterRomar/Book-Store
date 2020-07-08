'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('books', [{
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      description: 'Awesome book...',
      price: 15.2,
      rating: 4.75,
      img: '',
      demo_fragment: 'Bla-bla-bla',
      user_id: 2,
      category_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'War and Peace1',
      author: 'Leo Tolstoy',
      description: 'Awesome book...',
      price: 15.2,
      rating: 4.75,
      img: '',
      demo_fragment: 'Bla-bla-bla',
      user_id: 2,
      category_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'War and Peace2',
      author: 'Leo Tolstoy',
      description: 'Awesome book...',
      price: 15.2,
      rating: 4.75,
      img: '',
      demo_fragment: 'Bla-bla-bla',
      user_id: 2,
      category_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'War and Peace3',
      author: 'Leo Tolstoy',
      description: 'Awesome book...',
      price: 15.2,
      rating: 4.75,
      img: '',
      demo_fragment: 'Bla-bla-bla',
      user_id: 2,
      category_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'War and Peace4',
      author: 'Leo Tolstoy',
      description: 'Awesome book...',
      price: 15.2,
      rating: 4.75,
      img: '',
      demo_fragment: 'Bla-bla-bla',
      user_id: 2,
      category_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'War and Peace4',
      author: 'Leo Tolstoy',
      description: 'Awesome book...',
      price: 15.2,
      // rating: 4.75,
      img: '',
      demo_fragment: 'Bla-bla-bla',
      user_id: 2,
      category_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('books', null, {});
  }
};
