import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbconfig';

export class GroupsModel extends Model {
}

function initializeGroupsModel() {
  GroupsModel.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    }
  }, {
    tableName: 'groups',
    sequelize
  })
}

export default initializeGroupsModel;
