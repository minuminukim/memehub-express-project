"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Follows", "id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Follows", "id")]);
  },
};
