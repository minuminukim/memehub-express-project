const bcrypt = require("bcryptjs");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Demo",
          email: "hello@world.com",
          hashedPassword: await bcrypt.hash("password", 10),
          firstName: "Demo",
          lastName: "User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "davidlee",
          email: "david@memehub.com",
          hashedPassword: await bcrypt.hash("password", 10),
          firstName: "David",
          lastName: "Lee",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "willduffy",
          email: "will@memehub.com",
          hashedPassword: await bcrypt.hash("password", 10),
          firstName: "Will",
          lastName: "Duffy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "anthonyadams",
          email: "anthony@memehub.com",
          hashedPassword: await bcrypt.hash("password", 10),
          firstName: "Anthony",
          lastName: "Adams",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "minukim",
          email: "minu@memehub.com",
          hashedPassword: await bcrypt.hash("password", 10),
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
