"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      body: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
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
  Comment.associate = function (models) {
    Comment.hasMany(models.User, { foreignKey: "userId" });
    Comment.belongsTo(models.Meme, { foreignKey: "memeId" });
  };
  return Comment;
};
