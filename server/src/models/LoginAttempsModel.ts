import { DataTypes } from 'sequelize';
import db from '../database/db';
import UsersModel from './UsersModel';

const LoginAttempsModels = db.define('Attemp_Login', {
  Id_AttempLogin: {
    type: DataTypes.UUID(),
    primaryKey: true,
    allowNull: false
  },
  Location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Device: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Sistem_Operative: {
    type: DataTypes.STRING(10)
  },
   Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
    Ip_Direction: {
      type: DataTypes.INTEGER
  },
    Id_User: {
      type: DataTypes.UUID(),
      allowNull: false,
      references: {
        model: UsersModel,  
        key: 'Id_User'      
      }, 
    },
   }, {
  tableName: 'Attemp_Login',
  timestamps: false
});

LoginAttempsModels.belongsTo(LoginAttempsModels, { foreignKey: 'Id_Users' });

export default LoginAttempsModels;
