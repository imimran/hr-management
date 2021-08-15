"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {

      id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      last_name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    });

  return User;
}