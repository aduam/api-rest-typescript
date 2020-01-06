import express, { Application }  from  'express';
import morgan from 'morgan';
import authRouter from './routes/auth';


const app: Application = express();

// settings
app.set('port', 3000);

// middleware
app.use(morgan('dev'));

// routes
app.use(authRouter);

export {
  app,
}