import { DataTypes } from 'sequelize';
import db from '../database/db';
import UsersModel from './UsersModel';

const AplicationsUsersModel = db.define('Aplications_User', {
  Id_Aplications: {
    type: DataTypes.UUID(),
    primaryKey: true,
    allowNull: false
  },
  Name_Aplication: {
      type: DataTypes.STRING(20),
      allowNull: false
  },
  Email_Aplication: {
    type: DataTypes.STRING(30),
    allowNull: false
},
  Category_Aplication: {
    type: DataTypes.STRING(15),
},
  Password_Aplication: {
    type: DataTypes.UUID(),
    allowNull: false
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
  tableName: 'Aplications_User',
  timestamps: false
});

AplicationsUsersModel.belongsTo(AplicationsUsersModel, { foreignKey: 'Id_Users' });

export default AplicationsUsersModel;


