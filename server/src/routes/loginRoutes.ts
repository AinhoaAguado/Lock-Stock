import express from 'express';
import * as LoginController from '../controllers/loginController';
import * as loginUnblockController from "../controllers/loginUnblockController";

const router = express.Router();

router.post('/login', LoginController.login);
router.get("/unblock/:token", loginUnblockController.unblock)

export default router;