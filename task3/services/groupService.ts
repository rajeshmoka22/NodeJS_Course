import {v4 as uuidV4} from 'uuid';
import { sequelize } from '../config/dbconfig';
import { GroupsModel } from '../models/groupsModel';
import { Group, GroupRequest } from '../types/groupInterface';

export class GroupService {

  public static getAllGroups(){
    try {
      return GroupsModel.findAll()
    } catch(error) {
      throw new Error(error);
    }
  }

  public static getGroup(id: string){
    try {
      return GroupsModel.findByPk(id);
    } catch(error) {
      throw new Error(error);
    }
  }

  public static async updateGroup(id: string, data: GroupRequest){
    try {
      const {name, permissions} = data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const group: any = await GroupsModel.findByPk(id);
      if(!group) return;

      group.name = name;
      group.permissions = permissions;

      await group.save();
      return group;
    } catch(error) {
      throw new Error(error);
    }
  }

  public static async deleteGroup(id: string) {
    const transaction = await sequelize.transaction();
    try {
      const deletedGroups = await GroupsModel.destroy({
        where: {
          id
        },
        transaction
      });
      await transaction.commit();
      return deletedGroups;
    } catch(error){
      await transaction.rollback();
      throw new Error(error);
    }
  }

  public static createGroup(data: GroupRequest){
    try {
      const {name, permissions} = data;
      const id = uuidV4();
      return GroupsModel.create({id, name, permissions});
    } catch(error) {
      throw new Error(error);
    }
  }
}