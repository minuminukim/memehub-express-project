"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Demo",
          email: "hello@world.com",
          hashedPassword: "password",
          firstName: "Demo",
          lastName: "User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "davidlee",
          email: "david@memehub.com",
          hashedPassword: "password",
          firstName: "David",
          lastName: "Lee",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "willduffy",
          email: "will@memehub.com",
          hashedPassword: "password",
          firstName: "Will",
          lastName: "Duffy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "anthonyadams",
          email: "anthony@memehub.com",
          hashedPassword: "password",
          firstName: "Anthony",
          lastName: "Adams",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "minukim",
          email: "minu@memehub.com",
          hashedPassword: "password",
          firstName: "Minu",
          lastName: "Kim",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
