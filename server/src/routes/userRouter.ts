import express from 'express'; 
import { usersGetById, usersPost, usersPut } from '../controllers/usersController';
import validateUserMiddelware from '../middlewares/validateUserMiddelware';
import UserSchema from '../schemas/usersSchema';

const usersRouter = express.Router();

usersRouter.get('/users/:id', usersGetById);
usersRouter.post('/users', /*validateUserMiddelware(UserSchema),*/ usersPost);
usersRouter.put('/users/:id', validateUserMiddelware(UserSchema), usersPut);

export default usersRouter;

