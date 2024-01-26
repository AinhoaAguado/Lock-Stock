import { DataTypes } from "sequelize";
import db from "../database/db";

const UsersModel = db.define(
  "Users",
  {
    Id_User: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
    },
    Password_User: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password_Master_User: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email_User: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name_User: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SurName_User: {
      type: DataTypes.STRING,
    },
    Mobile_User: {
      type: DataTypes.INTEGER,
    },
    Question_Security_User: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Answer_Security_User: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Device_User: {
      type: DataTypes.STRING,
    },
    Notifications_User: {
      type: DataTypes.STRING,
    },
    LoginAttempts: {
      type: DataTypes.NUMBER,
    },
    TokenLogedUser: {
      type: DataTypes.STRING,
    },
    ExpiryTokenDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Block_User: {
      type: DataTypes.BOOLEAN,
    },
    Delete_User: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);

export default UsersModel;
