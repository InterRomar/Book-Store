'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('books', 'user_id', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "users",
          key: "id"
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('books', 'user_id', {});
  }
};
