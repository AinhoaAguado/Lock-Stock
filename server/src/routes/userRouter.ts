import express from 'express';
import { usersGet, usersPost } from '../controllers/usersController';

const usersRouter = express.Router();

usersRouter.get('/users', usersGet);
usersRouter.post('/users', usersPost);




export default usersRouter;