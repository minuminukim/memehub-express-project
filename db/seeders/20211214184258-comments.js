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
          body: "I'm Dead",
          userId: 1,
          memeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "So relatable",
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
          body: "!!!!!!!!!!!!!!",
          userId: 2,
          memeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "not me...",
          userId: 3,
          memeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "hahahahaha ha ha haha",
          userId: 4,
          memeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "That's A Spicy Meme",
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
          body: "I'm hungry",
          userId: 3,
          memeId: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "👀",
          userId: 2,
          memeId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "👀",
          userId: 5,
          memeId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "Oh no...",
          userId: 4,
          memeId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 3,
          memeId: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "This Is The Way",
          userId: 2,
          memeId: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂",
          userId: 5,
          memeId: 23,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "😂😂😂",
          userId: 3,
          memeId: 24,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "👀",
          userId: 2,
          memeId: 25,
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
