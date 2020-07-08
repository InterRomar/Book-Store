'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('books', 'category_id', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "categories",
          key: "id"
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('books', 'category_id', {});
  }
};
