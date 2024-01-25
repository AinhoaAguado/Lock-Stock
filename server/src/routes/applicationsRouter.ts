import express from 'express';
import { usersGetApplications } from '../controllers/applicationsController';

const applicationsRouter = express.Router();

applicationsRouter.get('/users/id:/applications',usersGetApplications);

//patch, post, delete, get



export default applicationsRouter;