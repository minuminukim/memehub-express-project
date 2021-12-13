"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: DataTypes.INTEGER,
      body: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      memeId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.hasMany(models.User, { foreignKey: "userId" });
    Comment.belongsTo(models.Meme, { foreignKey: "memeId" });
  };
  return Comment;
};
