import express from 'express';
import { usersGetDevices } from '../controllers/devicesController';

const devicesRouter = express.Router();

devicesRouter.get('/devices/:id', usersGetDevices);
//get, post, delete



export default devicesRouter;