"use strict";
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      memeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Memes" },
      },
    },
    {}
  );
  Like.associate = function (models) {
    Like.belongsTo(models.User, { foreignKey: "userId" });
    Like.belongsTo(models.Meme, { foreignKey: "memeId" });
  };
  return Like;
};
