"use strict";
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      memeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Memes" },
      },
    },
    {}
  );
  Like.associate = function (models) {
    Like.belongsTo(models.Meme, { foreignKey: "memeId" });
    Like.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Like;
};
