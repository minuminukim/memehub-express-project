"use strict";
module.exports = (sequelize, DataTypes) => {
  const Meme = sequelize.define(
    "Meme",
    {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      headline: {
        type: Sequelize.STRING(125),
      },
      caption: {
        type: Sequelize.STRING(255),
      },
      link: {
        allowNull: false,
        type: Sequelize.TEXT,
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
