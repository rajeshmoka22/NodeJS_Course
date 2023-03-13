import { UserModel } from '../models/userModel';

export class AuthService {
  public static getUser(login: string, password: string){
    try {
      return UserModel.findOne({
        where: {
          login,
          password,
          is_deleted: false
        }
      });
    } catch(error) {
      throw new Error(error);
    }
  }
}