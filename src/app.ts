import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';

const app: Application = express();

// const port = 3000;

// parser
app.use(express.json());
app.use(cors());


// application routes for users
app.use('/api/v1/users', StudentRoutes);

// application routes
app.use('/api/v1/students', StudentRoutes);


const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);

// console.log(process.cwd());

export default app;
