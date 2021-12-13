"use strict";
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "Follow",
    {
      id: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      followerId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  Follow.associate = function (models) {
    Follow.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Follow;
};
