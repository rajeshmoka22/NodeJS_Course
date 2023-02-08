import Joi from 'joi';
import {Request, Response, NextFunction} from 'express';
import { PermissionList } from '../../types/groupInterface';

export const groupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().unique().min(1).max(5).items(
    Joi.string().valid(PermissionList.READ),
    Joi.string().valid(PermissionList.WRITE),
    Joi.string().valid(PermissionList.DELETE),
    Joi.string().valid(PermissionList.SHARE),
    Joi.string().valid(PermissionList.UPLOAD_FILES),
  ).required(),
});

type groupSchema = typeof groupSchema;

export const groupValidator = (schema: groupSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  const valid = error == null;
  if (valid) { 
    next(); 
  } else {
    res.status(400).send({message: error?.details?.[0]?.message || 'Bad request'});
  }
}
