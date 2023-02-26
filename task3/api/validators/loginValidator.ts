import Joi from 'joi';
import {Request, Response, NextFunction} from 'express';

export const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required()
});

type LoginSchema = typeof loginSchema;

export const loginValidator = (schema: LoginSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  const valid = error == null;
  if (valid) { 
    next(); 
  } else {
    res.status(400).send({message: error?.details?.[0]?.message || 'Bad request'});
  }
}
