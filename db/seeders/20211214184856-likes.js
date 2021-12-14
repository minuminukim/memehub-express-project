"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Likes",
      [
        {
          userId: 2,
          memeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          memeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          memeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          memeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          memeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          memeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          memeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          memeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          memeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          memeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          memeId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          memeId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          memeId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          memeId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          memeId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          memeId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          memeId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          memeId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          memeId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          memeId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Likes", null, {});
  },
};
