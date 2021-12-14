"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */

    return queryInterface.bulkInsert(
      "Memes",
      [
        {
          userId: 1,
          isBetaMember: false,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Memes", null, {});
  },
};
