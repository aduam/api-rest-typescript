import dotenv from 'dotenv';
dotenv.config();
import express, { Application, json }  from  'express';
import morgan from 'morgan';
import authRouter from './routes/auth';


const app: Application = express();

// settings
app.set('port', 3000);

// middleware
app.use(json());
app.use(morgan('dev'));

// routes
app.use('/api/auth', authRouter);

export {
  app,
}