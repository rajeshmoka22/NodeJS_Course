import { Request, Response, NextFunction } from "express";
import { ControllerLogger } from "../api/middleware/controllerLogger";
import { GroupService } from "../services/groupService";
import { UserGroupService } from "../services/userGroupService";
import { GroupRequest } from "../types/groupInterface";

export class GroupController {

  @ControllerLogger()
  public static async getGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const group = await GroupService.getGroup(id);
      if(!group) res.send({message: `group not found for id ${id}`});
      res.send(group);
    } catch(error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async getAllGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await GroupService.getAllGroups();
      res.send(groups || []);
    } catch(error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const {name, permissions} = req.body as GroupRequest;
      await GroupService.createGroup({name, permissions});
      res.status(200).send({message: 'group created successfully'});
    } catch(error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async updateGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const {name, permissions} = req.body as GroupRequest;
      const {id} = req.params;
      const updatedGroup = await GroupService.updateGroup(id, {name, permissions});
      if(!updatedGroup) res.status(404).send({message: `group not found for id: ${id}`});
      else res.send(updatedGroup);
    } catch(error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const updatedRowCount = await GroupService.deleteGroup(id);
      if(updatedRowCount) res.status(200).send({message: 'group deleted'});
      else res.status(404).send({message: `group not found for id: ${id}`});
    } catch(error) {
      return next(error);
    }
  }

  @ControllerLogger()
  public static async addUsersToGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId} = req.body;
      const {id} = req.params;
      const added = await UserGroupService.addUsersToGroup(id, userId);
      if(!added) res.status(404).send({message:`group not found for id ${id}`});
      else res.send({message: 'user got added'});
    } catch(error) {
      return next(error);
    }
  }
}
