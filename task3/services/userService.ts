import {v4 as uuidV4} from 'uuid';
import { Op } from 'sequelize';
import { UserModel } from '../models/userModel';
import { UserInput, AutoSuggest } from '../types/userInterface';

export class UserService {

  public static getUsers(data: AutoSuggest){
    try {
      const {loginSubstring, limit} = data;
      return UserModel.findAll({
        where: {
          login: {
            [Op.iLike]: `%${loginSubstring || ''}%`,
          },
          is_deleted: false
        },
        order: ['login'],
        limit
      })
    } catch(error) {
      throw new Error(error);
    }
  }

  public static getUser(id: string){
    try {
      return UserModel.findOne({
        where: {
          id: id,
          is_deleted: false
        }
      });
    } catch(error) {
      throw new Error(error);
    }
  }

  public static async updateUser(id: string, data: UserInput){
    try {
      const {login, password, age} = data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = (await UserModel.findOne({
        where: {
          id: id,
          is_deleted: false
        }
      }));
      if(!user) return;

      user.login = login;
      user.password = password;
      user.age = age;

      await user.save();
      return user;
    } catch(error) {
      throw new Error(error);
    }
  }

  public static async deleteUser(id: string) {
    try {
      const [updatedRows] = await UserModel.update({
        is_deleted: true
      }, {
        where: {
          id,
          is_deleted: false
        }
      });
      return updatedRows;
    } catch(error){
      throw new Error(error);
    }
  }

  public static createUser(user: UserInput){
    try {
      const {login, password, age} = user;
      const id = uuidV4();
      return UserModel.create({id, login, password, age});
    } catch(error) {
      throw new Error(error);
    }
  }
}