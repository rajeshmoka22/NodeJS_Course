import { Request, Response, NextFunction } from "express";
import { AutoSuggest, UserInput } from "../types/userInterface";

import { UserService } from "../services/userService";


export class UserController {

  public static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const {loginSubstring, limit=10} = req.query as AutoSuggest;
      const users = await UserService.getUsers({loginSubstring, limit});
      res.send(users || []);
    } catch(error) {
      return next(error);
    }
  }

  public static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const user = await UserService.getUser(id);
      if(!user) res.send({message: `user not found for id: ${id}`});
      else res.send(user);
    } catch(error) {
      return next(error);
    }
  }

  public static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('inside create user controller', req.body);
      const {login, password, age} = req.body as UserInput;
      await UserService.createUser({login, password, age});
      res.status(200).send({message: 'user created successfully'});
    } catch(error) {
      return next(error);
    }
  }

  public static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {login, password, age} = req.body as UserInput;
      const {id} = req.params;
      const updatedUser = await UserService.updateUser(id, {login, password, age});
      if(!updatedUser) res.status(404).send({message: `user not found for id: ${id}`});
      else res.send(updatedUser);
    } catch(error) {
      return next(error);
    }
  }

  public static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const updatedRowCount = await UserService.deleteUser(id);
      if(updatedRowCount) res.status(200).send({message: 'user deleted'});
      else res.status(404).send({message: `user not found for id: ${id}`});
    } catch(error) {
      return next(error);
    }
  }
}
