import express from 'express';
import { userGetApplications, userGetByIdApplications, userPostApplications, userDeleteApplications } from '../controllers/applicationsController';

const applicationsRouter = express.Router();

applicationsRouter.get('/applicationsUser/', userGetApplications);
applicationsRouter.get('/applicationsUser/:id', userGetByIdApplications);
applicationsRouter.post('/applicationsUser/:id', userPostApplications);
applicationsRouter.delete('/applicationsUser/:id', userDeleteApplications);

//patch, post, delete, get



export default applicationsRouter;