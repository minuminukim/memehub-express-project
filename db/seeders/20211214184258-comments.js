"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          body: "😂😂😂",
          userId: 1,
          memeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "hello world",
          userId: 1,
          memeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂 ha hah ah",
          userId: 2,
          memeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 3,
          memeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 2,
          memeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 3,
          memeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 5,
          memeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 4,
          memeId: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 4,
          memeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 3,
          memeId: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 2,
          memeId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 5,
          memeId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 4,
          memeId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 3,
          memeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 2,
          memeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 5,
          memeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 3,
          memeId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 2,
          memeId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
