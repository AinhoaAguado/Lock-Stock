import { Request, Response } from "express";
// import AdminModel from "../models/AdminModel";
import UsersModel from "../models/UsersModel";
// import { v4 as generateUuid } from "uuid";
// import bcrypt from "bcrypt";
// import { sign } from "jsonwebtoken";
import validateMiddelwareUser from "../middlewares/validateMiddelwareUser";
// import "dotenv/config";


//cambiar todos los errores a uno stadar para todos txt y codigoerror
export const adminGetUsers = async (_req: Request, res: Response) => {
  try {
      // tenemos que comparar el token de inicio de sesión de admin y 
      // y pedirle cu sontraseña maestra de administratorrr 
      // estos datos se comparan con los haseados de la bbdd  antes de cada acción
      // const isAdmin = validateMiddelwareAdmin(req.body);

    const admins = await UsersModel.findAll();
    res.status(200).json(admins);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const adminGetUsersByID = async (req: Request, res: Response) => {
  try {
    // tenemos que comparar el token de inicio de sesión de admin y 
  // y pedirle cu sontraseña maestra de administratorrr 
  // estos datos se comparan con los haseados de la bbdd  antes de cada acción
    // const isAdmin = validateMiddelwareAdmin(req.body);
    const user = await UsersModel.findOne({
      where: {
        Id_User: req.params.id,
      },
      });
    
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Credenciales Inválidas" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const adminPutUsers = async (req: Request, res: Response) => {
  try {
    // tenemos que comparar el token de inicio de sesión de admin y 
  // y pedirle cu sontraseña maestra de administratorrr 
  // estos datos se comparan con los haseados de la bbdd  antes de cada acción
    // const isAdmin = validateMiddelwareAdmin(req.body);
    //recibiremos info como contraseñas y name user y datos privados haseado desde front, así qeu primero hay que compararlo
    validateMiddelwareUser(req.body);
    
    await UsersModel.update(
      {
        Notifications_User: req.body.Notifications_User,
        Block_User: req.body.Block_User,
      },
      {
        where: {
          Id_User: req.params.id,
        },
      }
      );
      
      res.status(200).json({ message: "Usuario actualizado" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };
  
  export const adminDeleteUsers = async (req: Request, res: Response) => {
  try {
    // tenemos que comparar el token de inicio de sesión de admin y 
  // y pedirle cu sontraseña maestra de administratorrr 
  // estos datos se comparan con los haseados de la bbdd  antes de cada acción
    // const isAdmin = validateMiddelwareAdmin(req.body);
    await UsersModel.destroy({
      where: {
        Id_User: req.params.id,
      },
    });

    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


