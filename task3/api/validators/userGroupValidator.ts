import Joi from 'joi';
import {Request, Response, NextFunction} from 'express';

export const userGroupSchema = Joi.object({
  userId: Joi.array().items(Joi.string()).required(),
});

type userGroupSchema = typeof userGroupSchema;

export const userGroupValidator = (schema: userGroupSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  const valid = error == null;
  if (valid) { 
    next(); 
  } else {
    res.status(400).send({message: error?.details?.[0]?.message || 'Bad request'});
  }
}
