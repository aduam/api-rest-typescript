import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IUser {
  _id: string,
  username: string,
  email: string
}

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('authorization');
  if (!token) return res.status(401).json('Access denied')
  const payload = jwt.verify(token, process.env.SECRET_JWT || 'test_token') as IUser;
  req.userContent = {
    _id: payload._id,
    username: payload.username,
    email: payload.email
  };
  next();
}