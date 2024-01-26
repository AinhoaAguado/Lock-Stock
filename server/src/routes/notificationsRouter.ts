import express from 'express';
import { usersGetNotifications } from '../controllers/notificationsController';
import validateMiddelwareUserNotifications from '../middlewares/validateMiddelwareUser';
import { NotificationsSchema } from '../schemas/NotificationsSchema';
const notificationsRouter = express.Router();

notificationsRouter.get('/notifications/id:', validateMiddelwareUserNotifications(NotificationsSchema), usersGetNotifications);
//get, delete, post


export default notificationsRouter;