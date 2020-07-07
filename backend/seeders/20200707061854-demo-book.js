'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      description: 'Awesome book...',
      price: 15.2,
      rating: 4.75,
      img: '',
      demo_fragment: 'Bla-bla-bla',
      UserID: 2,
      CategoryID: 9,
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
      UserID: 2,
      CategoryID: 8,
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
      UserID: 2,
      CategoryID: 5,
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
      UserID: 2,
      CategoryID: 7,
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
      UserID: 2,
      CategoryID: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'War and Peace5',
      author: 'Leo Tolstoy',
      description: 'Awesome book...',
      price: 15.2,
      rating: 4.75,
      img: '',
      demo_fragment: 'Bla-bla-bla',
      UserID: 2,
      CategoryID: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
