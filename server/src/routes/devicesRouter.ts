import express from 'express';
import { devicesGet } from '../controllers/devicesController';

const devicesRouter = express.Router();

devicesRouter.get('/devices', devicesGet);




export default devicesRouter;