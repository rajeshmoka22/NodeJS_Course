import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbconfig';
import { UserGroup } from '../types/userGroupInterface';

export class UserGroupModel extends Model implements UserGroup {
  id!: string;
  groupId!: string;
  userId!: string;
}

function initializeUserGroupModel() {
  UserGroupModel.init({
    id: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    groupid: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userid: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'usergroup',
    sequelize
  })
}

export default initializeUserGroupModel;
