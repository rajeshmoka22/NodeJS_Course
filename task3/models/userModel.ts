import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbconfig';

export class UserModel extends Model {
}

function initializeUserModel() {
  UserModel.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'users',
    sequelize
  })
}

export default initializeUserModel;
