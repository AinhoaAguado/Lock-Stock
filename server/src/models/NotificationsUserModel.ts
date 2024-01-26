import { DataTypes } from 'sequelize';
import db from '../database/db';
import UsersModel from './UsersModel';

const NotificationsUserModel = db.define('Notifications_User', {
    Id_Notification: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false
    },
  Notes_Notification: {
    type: DataTypes.STRING(500),
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
  tableName: 'Notifications_User',
  timestamps: false
});

// NotificationsUserModel.belongsTo(NotificationsUserModel, { foreignKey: 'Id_Users' });

export default NotificationsUserModel;
