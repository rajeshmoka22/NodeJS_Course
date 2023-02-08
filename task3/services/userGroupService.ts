import {v4 as uuidV4} from 'uuid';
import { sequelize } from '../config/dbconfig';
import { GroupsModel } from '../models/groupsModel';
import { UserGroupModel } from '../models/userGroupModel';
import { UserModel } from '../models/userModel';
import { User } from '../types/userInterface';

export class UserGroupService {

  public static async addUsersToGroup(groupId: string, userId: Array<string>){
    const transaction  = await sequelize.transaction();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const group: any = await GroupsModel.findByPk(groupId);
      if(!group) return;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resp: any = await UserModel.findAll({
        where: {
          id: userId,
          is_deleted: false
        }
      });

      const users = Array.from(resp) as User[];
      const userGroup = await UserGroupModel.bulkCreate(
        users.map((user: User) => {
          return ({
            id: uuidV4(),
            groupid: groupId,
            userid: user.id
          })
        }),
        {
          transaction
        }
      );

      await transaction.commit();
      return userGroup;
    } catch(error) {
      await transaction.rollback();
      throw new Error(error);
    }
  }

}