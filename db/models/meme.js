"use strict";
module.exports = (sequelize, DataTypes) => {
  const Meme = sequelize.define(
    "Meme",
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
  Meme.associate = function (models) {
    Meme.hasMany(models.Comment, { foreignKey: "memeId" });
    Meme.hasMany(models.Like, { foreignKey: "memeId" });
    Meme.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Meme;
};
