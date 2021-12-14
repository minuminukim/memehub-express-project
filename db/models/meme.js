"use strict";
module.exports = (sequelize, DataTypes) => {
  const Meme = sequelize.define(
    "Meme",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      headline: {
        type: DataTypes.STRING(125),
      },
      caption: {
        type: DataTypes.STRING(255),
      },
      link: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
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
