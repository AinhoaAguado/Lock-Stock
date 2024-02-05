import { Request, Response } from "express"
import AplicationsUsersModel from "../models/AplicationsUsersModel";

export const usersGetApplications = async (_req: Request, res: Response) => {
    try {
      
      // validateTokenMiddleware(req, res, async () => {
      const users = await AplicationsUsersModel.findAll();
      res.status(200).json(users);
      // });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Error al obtener las aplicaciones" });
      }
    }
  };

  export const usersGetByIdApplications = async (req: Request, res: Response) => {
    try {
      // validateTokenMiddleware(req, res, async () => {
        const user = await AplicationsUsersModel.findOne({
        where: {
          Id_User: req.params.id,
        },
      });
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "error con la aplicación solicitada" });
        return
      }
    // });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
        return
      }
    }
  };
  
  //post --------------------------
  //put ---------------------------
  
export const usersDeleteApplications = async (req: Request, res: Response) => {
  try {
    // validateTokenMiddleware(req, res, async () => {
      await AplicationsUsersModel.destroy({
      where: {
        Id_applications: req.params.id,
      },
    });
    res.status(200).json({ message: "Aplicación eliminada" });
  // });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return
    }
  }
};
