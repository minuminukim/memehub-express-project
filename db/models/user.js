"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
      },
    },
    {}
  );
  User.associate = function (models) {
    const columnMappingOne = {
      // User -> User, through Follow as follower
      through: "Follow",
      otherKey: "userId",
      foreignKey: "followerId",
      as: "followings",
    };
    const columnMappingTwo = {
      // User -> User, through Follow as following
      through: "Follow",
      otherKey: "followerId",
      foreignKey: "userId",
      as: "followers",
    };

    User.belongsToMany(models.User, columnMappingOne);
    User.belongsToMany(models.User, columnMappingTwo);
    User.hasMany(models.Meme, { foreignKey: "userId" });
    User.hasMany(models.Like, { foreignKey: "userId" });
    User.hasMany(models.Comment, { foreignKey: "userId" });
  };
  return User;
};
