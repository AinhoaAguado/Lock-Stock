import { DataTypes } from 'sequelize';
import db from '../database/db';


const UsersModel = db.define('Users', {
  Id_User: {
    type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false
  },
  Password_User: {
    type: DataTypes.STRING,
    allowNull: false
  },
   Password_Master_User: {
    type: DataTypes.STRING,
    allowNull: false
  },
    Email_User: {
      type: DataTypes.STRING(30),
      allowNull: false
  },
   Name_User: {
      type: DataTypes.STRING(20),
      allowNull: false
  },
    SurName_User: {
      type: DataTypes.STRING(20)
  },
    Mobile_User: {
      type: DataTypes.INTEGER
    },
      Question_Security_User: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
      Answer_Security_User: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
      Device_User: {
      type: DataTypes.STRING(30)
  },
    Notifications_User: {
      type: DataTypes.STRING(30),
  },
  loginAttempts: {
      type: DataTypes.INTEGER,
  },
  TokenLogedUser: {
    type: DataTypes.STRING(300),
  },
  ExpiryTokenDate: {
  type: DataTypes.DATE(),
  },
    Block_User: {
      type: DataTypes.BOOLEAN,
  },
    Delete_User: {
      type: DataTypes.BOOLEAN,
  },
}, {
  tableName: 'Users',
  timestamps: false
});


export default UsersModel;
