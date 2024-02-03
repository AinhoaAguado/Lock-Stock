import { Request, Response } from "express";
import UsersModel from "../models/UsersModel";
import { v4 as generateUuid } from "uuid";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
//import validateMiddelwareUser from "../middlewares/validateMiddelwareUser"; comentado para desactivar temporalmente el middlware, al igual que en la ruta y el propio controlador
import "dotenv/config";
import { UserInterface } from '../../userInterface';



export const usersGet = async (_req: Request, res: Response) => {
  try {
    const users = await UsersModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const usersGetById = async (req: Request, res: Response) => {
  try {
    const user = await UsersModel.findOne({
      where: {
        Id_User: req.params.id,
      },
    }) as UserInterface | null;

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


export const usersPost = async (req: Request, res: Response) => {
  try {
     //validateMiddelwareUser(req.body); comentado para desactivar temporalmente el middlware, al igual que en la ruta y el propio controlador
    const userUuid = generateUuid();
    const hashedPassword_User = await bcrypt.hash(req.body.Password_User, 10);

    // Valores predeterminados para campos no proporcionados por el frontend
    const DEFAULT_MASTER_PASSWORD = 'default_master_password'; // Debe ser algo seguro y único por usuario
    const hashedPassword_Master_User = await bcrypt.hash(DEFAULT_MASTER_PASSWORD, 10);
    const DEFAULT_SECURITY_QUESTION = 'default_security_question';
    const DEFAULT_SECURITY_ANSWER = 'default_security_answer';

    const SECRET_KEY = process.env.SECRET_KEY;

    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY environment variable is not set");
    } else {
      const token = sign({ userUuid }, SECRET_KEY, { expiresIn: "86400s" });

      await UsersModel.create({
        Id_User: userUuid,
        Password_User: hashedPassword_User,
        Password_Master_User: hashedPassword_Master_User,
        Email_User: req.body.Email_User,
        Name_User: req.body.Name_User,
        SurName_User: req.body.SurName_User,
        Mobile_User: req.body.Mobile_User,
        Question_Security_User: DEFAULT_SECURITY_QUESTION,
        Answer_Security_User: DEFAULT_SECURITY_ANSWER,
        Device_User: 'default_device',
        Notifications_User: 'default_notifications',
        loginAttempts: 0,
        Block_User: false,
        Delete_User: false,
        // Aquí puedes añadir los campos de fechas y ubicaciones como valores predeterminados o null si son opcionales
      });

      res.status(201).json({ token });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};



export const usersPut = async (req: Request, res: Response) => {
  try {
   // validateMiddelwareUser(req.body); comentado para desactivar temporalmente el middlware, al igual que en la ruta y el propio controlador

    await UsersModel.update(
      {
        Email_User: req.body.Email_User,
        Name_User: req.body.Name_User,
        SurName_User: req.body.SurName_User,
        Mobile_User: req.body.Mobile_User,
        Question_Security_User: req.body.Question_Security_User,
        Answer_Security_User: req.body.Answer_Security_User,
        Device_User: req.body.Device_User,
        Notifications_User: req.body.Notifications_User,
        Block_User: req.body.Block_User,
        Delete_User: req.body.Delete_User,
        //añadir fecha de modificación/envío/conexión
        //añadir ubicación de modificación/envío/conexión
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

export const usersDelete = async (req: Request, res: Response) => {
  try {
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