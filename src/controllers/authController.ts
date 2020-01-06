import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';

const generatePasswordEncrypt = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

const validatePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}

export const signup = async (req: Request, res: Response) => {
  // saving a new user
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: await generatePasswordEncrypt(req.body.password)
  });
  const savedUser = await user.save()

  // token
  const token: string = jwt.sign({
    _id: savedUser._id,
    username: savedUser.username,
    email: savedUser.email
  }, process.env.SECRET_JWT || 'token_test' );
  res.header('authorization', token).json(savedUser);
};

export const signin = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send('Email or password is wrong');
  const valUser = await validatePassword(req.body.password, user.password)
  if (!valUser) return res.send('Password incorrect');

  const token = await jwt.sign({
    _id: user._id,
    username: user.username,
    email: user.email
  }, process.env.SECRET_JWT || 'test_token', {
    expiresIn: '24h'
  })

  res.header('authorization', token).send(user)
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userContent._id, { password: 0 });
  if (!user) return res.status(404).json('No user found')
  res.json(user)
};