
import initializeGroupsModel, { GroupsModel } from "../models/groupsModel";
import initializeUserGroupModel, { UserGroupModel } from "../models/userGroupModel";
import initializeUserModel, { UserModel } from "../models/userModel";

export const initModels = () => {
  initializeUserModel();
  initializeGroupsModel();
  initializeUserGroupModel();
  addRelationship();
}

function addRelationship() {
  UserModel.belongsToMany(GroupsModel, {
    through: UserGroupModel,
    foreignKey: 'userid'
  });

  GroupsModel.belongsToMany(UserModel, {
    through: UserGroupModel,
    foreignKey: 'groupid',
  });
}
