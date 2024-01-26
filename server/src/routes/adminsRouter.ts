import express from 'express';
import { adminGetUsers, adminGetUsersByID, adminPutUsers, adminDeleteUsers } from '../controllers/adminsController';

const adminRouter = express.Router();

adminRouter.get('/admin', adminGetUsers);
adminRouter.get('/admin/:id', adminGetUsersByID);
adminRouter.put('/admin/:id',  adminPutUsers);
adminRouter.delete('/admin/:id',  adminDeleteUsers);

export default adminRouter;