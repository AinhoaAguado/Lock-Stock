import express from 'express';
import { notificationsGet } from '../controllers/notificationsController';

const notificationsRouter = express.Router();

notificationsRouter.get('/notifications', notificationsGet);




export default notificationsRouter;