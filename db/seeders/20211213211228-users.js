let bcrypt = require("bcryptjs");
const { passwords } = require("../../config");

("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "hugh_neutron",
          email: "hello@world.com",
          hashedPassword: await bcrypt.hash("password", 10),
          firstName: "Hugh",
          lastName: "Neutron",
          profilePicture: "https://i.ibb.co/8DQcq1B/hugh-neutron.jpg",
          biography: "Proud father. Duck enthusiast. Pie connoisseur.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "davidlee",
          email: "david@memehub.com",
          hashedPassword: await bcrypt.hash(passwords.david, 10),
          firstName: "David",
          lastName: "Lee",
          profilePicture:
            "https://ca.slack-edge.com/T03GU501J-U026DK14W3U-05f476edeb89-72",
          biography:
            "David Lee is a student at App Academy graduating in March of 2022.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "willduffy",
          email: "will@memehub.com",
          hashedPassword: await bcrypt.hash(passwords.will, 10),
          firstName: "Will",
          lastName: "Duffy",
          profilePicture:
            "https://ca.slack-edge.com/T03GU501J-U026FTGTV4Z-fe9950702ece-512",
          biography:
            "Will Duffy is a student at App Academy graduating in March of 2022.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "anthonyadams",
          email: "anthony@memehub.com",
          hashedPassword: await bcrypt.hash(passwords.anthony, 10),
          firstName: "Anthony",
          lastName: "Adams",
          profilePicture:
            "https://ca.slack-edge.com/T03GU501J-U025F637031-gb09ca85017a-72",
          biography:
            "Anthony Adams is a student at App Academy graduating in March of 2022.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "minukim",
          email: "minu@memehub.com",
          hashedPassword: await bcrypt.hash(passwords.minu, 10),
          firstName: "Minu",
          lastName: "Kim",
          profilePicture:
            "https://ca.slack-edge.com/T03GU501J-U02BEDSSE9K-8bab4d8fbfc1-512",
          biography:
            "Minu Kim is a student at App Academy graduating in March of 2022.",
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
