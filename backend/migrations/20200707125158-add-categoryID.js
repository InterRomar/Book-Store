'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('Books', 'CategoryID', {
      type: Sequelize.DataTypes.INTEGER
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('Books', 'CategoryID', {});
  }
};
