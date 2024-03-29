import { Request, Response } from "express"
import DevicesUsersModel from "../models/DevicesUserModel";

export const usersGetNotifications = async (_req: Request, res: Response) => {
    try {
      const users = await DevicesUsersModel.findAll();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };
  