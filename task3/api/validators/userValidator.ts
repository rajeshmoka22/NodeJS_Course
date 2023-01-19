import Joi from 'joi';
import {Request, Response, NextFunction} from 'express';

export const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().integer().min(4).max(130).required()
});

type UserSchema = typeof userSchema;

export const userValidator = (schema: UserSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  const valid = error == null;
  if (valid) { 
    next(); 
  } else {
    res.status(400).send({message: error?.details?.[0]?.message || 'Bad request'});
  }
}
