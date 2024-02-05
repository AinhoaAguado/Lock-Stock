import { Request, Response } from "express";
import UsersModel from "../models/UsersModel";
import { v4 as generateUuid } from "uuid";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import jwt from 'jsonwebtoken';
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
    const email = await UsersModel.findOne({
      where: {
       Email_User: req.body.Email_User,
      },
    }) as UserInterface | null;

    if(email) {
      res.status(400).json({menssagge: 'ya existe un usuario registrado con ese mail'})
    }
    
    const userUuid = generateUuid();
    const hashedPassword_User = await bcrypt.hash(req.body.Password_User, 10);
    const hashedPassword_Master_User = await bcrypt.hash(req.body.Password_Master_User || 'quantum_master_password', 10);
    const deviceType = req.deviceInfo.deviceType;
    const SECRET_KEY = process.env.SECRET_KEY;
    if (!SECRET_KEY) {
      throw new Error("La clave secreta no está definida en las variables de entorno.");
    }

    // Ahora SECRET_KEY tiene un valor definido y no es ni undefined ni null
    const token = jwt.sign(
      { Id_User: userUuid },
      SECRET_KEY,
      { expiresIn: '86400s' }
    );
      console.log('******** TOKEN: ', token);
      // const hashedToken = await bcrypt.hash(token, 10);
      console.log('******** TOKEN: ', token);
      const expiryDate = new Date();
      expiryDate.setSeconds(expiryDate.getSeconds() + 86400); // Añade 86400 segundos (24 horas) a la fecha actual


        await UsersModel.create({
          Id_User: userUuid,
          Password_User: hashedPassword_User,
          Password_Master_User: hashedPassword_Master_User,
          Email_User: req.body.Email_User,
          Name_User: req.body.Name_User,
          SurName_User: req.body.SurName_User,
          Mobile_User: req.body.Mobile_User,
          Question_Security_User: req.body.Question_Security_User || 'default_question',
          Answer_Security_User: req.body.Answer_Security_User || 'default_answer',
          Device_User: deviceType, 
          Notifications_User: req.body.Notifications_User || 'default_notifications',
          loginAttempts: 0,
          TokenLogedUser: token,
          ExpiryTokenDate: expiryDate,
        Block_User: false,
        Delete_User: false,
      });
      
      // res.cookie('accessToken', token, {
      //   httpOnly: true, // La cookie solo es accesible a través del protocolo HTTP(S)
      //   secure: true, // La cookie solo se enviará a través de HTTPS
      //   sameSite: 'strict', // La cookie solo se enviará en solicitudes del mismo sitio
      //   expires: expiryDate, // La cookie expirará en la fecha proporcionada
      // });
 

      res.status(201).json({ accessToken: token, Id_User: userUuid, deviceType }); // Opcionalmente, devuelve el tipo de dispositivo y la IP en la respuesta
    
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
