import express from 'express';
import { adminsGet } from '../controllers/adminsController';

const adminRouter = express.Router();

adminRouter.get('/admins', adminsGet);




export default adminRouter;