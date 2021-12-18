let bcrypt = require("bcryptjs");
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
          profilePicture: "https://www.pngitem.com/pimgs/m/524-5246388_anonymous-user-hd-png-download.png",
          biography: "Demo user biography.  Here you would include information about yourself.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "davidlee",
          email: "david@memehub.com",
          hashedPassword: await bcrypt.hash("password", 10),
          firstName: "David",
          lastName: "Lee",
          profilePicture: "https://ca.slack-edge.com/T03GU501J-U026DK14W3U-05f476edeb89-72",
          biography: "David Lee is a student at App Academy.  MemeHub is his first Full-Stack group project",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "willduffy",
          email: "will@memehub.com",
          hashedPassword: await bcrypt.hash("password", 10),
          firstName: "Will",
          lastName: "Duffy",
          profilePicture: "https://ca.slack-edge.com/T03GU501J-U026FTGTV4Z-fe9950702ece-512",
          biography: "Will Duffy is a student at App Academy.  MemeHub is his first Full-Stack group project",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "anthonyadams",
          email: "anthony@memehub.com",
          hashedPassword: await bcrypt.hash("password", 10),
          firstName: "Anthony",
          lastName: "Adams",
          profilePicture: "https://ca.slack-edge.com/T03GU501J-U025F637031-gb09ca85017a-72",
          biography: "Anthony Adams is a student at App Academy.  MemeHub is his first Full-Stack group project",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "minukim",
          email: "minu@memehub.com",
          hashedPassword: await bcrypt.hash("password", 10),
          firstName: "Minu",
          lastName: "Kim",
          profilePicture: "https://ca.slack-edge.com/T03GU501J-U02BEDSSE9K-8bab4d8fbfc1-512",
          biography: "Minu Kim is a student at App Academy.  MemeHub is his first Full-Stack group project",
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
