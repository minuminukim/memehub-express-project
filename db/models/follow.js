"use strict";
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "Follow",
    {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      followerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
    },
    {}
  );
  Follow.associate = function (models) {
    Follow.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Follow;
};
