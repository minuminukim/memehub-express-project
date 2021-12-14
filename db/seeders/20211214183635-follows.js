"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Follows",
      [
        {
          userId: 1,
          followerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          followerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          followerId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          followerId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          followerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          followerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          followerId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          followerId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          followerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          followerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          followerId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          followerId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          followerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          followerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          followerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          followerId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          followerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          followerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          followerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          followerId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Follows", null, {});
  },
};
