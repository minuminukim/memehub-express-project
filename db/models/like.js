"use strict";
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      id: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      memeId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  Like.associate = function (models) {
    Like.belongsTo(models.User, { foreignKey: "userId" });
    Like.belongsTo(models.Meme, { foreignKey: "memeId" });
  };
  return Like;
};
