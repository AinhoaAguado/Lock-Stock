import { Request, Response } from "express";
import UsersModel from "../models/UsersModel";
import { v4 as generateUuid } from "uuid";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import validateMiddelwareUser from "../middlewares/validateMiddelwareUser";
import "dotenv/config";

export const usersGetById = async (req: Request, res: Response) => {
  try {
    //enviar primero a comprobar token de bbdd haseado con token sesion en navegador haseado tambien 
    // validateMiddelwareUser(req.body);
    const user = await UsersModel.findOne({
      where: {
        Id_User: req.params.id,
      },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Cedenciales Inválidas" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const usersRegisterPost = async (req: Request, res: Response) => {
  try {
    validateMiddelwareUser(req.body);

    const existingUser = await UsersModel.findOne({
      where: [{ 
        Email_User: req.body.Email_User 
      },{
        Name_User: req.body.Name_User 
      }]
    });

    if (existingUser) {
      res.status(400).json({ message: "Ya existe un usuario con el mismo nombre o correo electrónico" });
      return;
    }
    
    const userUuid = generateUuid();
    // const hashedUserUuid = await bcrypt.hash(userUuid, 10);
    const hashedUserUuid = userUuid;
    // const hashedEmail_User = await bcrypt.hash(req.body.Email_User, 10);
    const hashedEmail_User = req.body.Email_User;
    // const hashedName_User = await bcrypt.hash(req.body.Name_User, 10);
    const hashedName_User = req.body.Name_User;
    // const hashedSurName_User = await bcrypt.hash( req.body.SurName_User, 10);
    const hashedSurName_User =  req.body.SurName_User;
    // const hashedPassword_Master_User = await bcrypt.hash(req.body.Password_Master_User, 10);
    const hashedPassword_Master_User = req.body.Password_Master_User;
    // const hashedMobileUser_User = await bcrypt.hash(req.body.Mobile_User, 10);
    const hashedMobileUser_User = req.body.Mobile_User;
    const hashedPassword_User = await bcrypt.hash(req.body.Password_User, 10);
    const SECRET_KEY = process.env.SECRET_KEY;

    if (!SECRET_KEY) {
      throw new Error("error");
    } else {
      const tokenLogedUser = sign({ hashedUserUuid }, SECRET_KEY, { expiresIn: "86400s" });
      const hashedTokenLogedUser = await bcrypt.hash(tokenLogedUser, 10);
      const DateRegisterUser = new Date();

      await UsersModel.create({
        Id_User: hashedUserUuid,
        Password_User: hashedPassword_User,
        Password_Master_User: hashedPassword_Master_User,
        Email_User: hashedEmail_User,
        Name_User: hashedName_User,
        SurName_User: hashedSurName_User,
        Mobile_User: hashedMobileUser_User,
        Question_Security_User: req.body.Question_Security_User,
        Answer_Security_User: req.body.Answer_Security_User,
        //añadir fecha de creación/envío/conexión
        //añadir ubicación de creación/envío/conexión:    DateRegisterUser
        Device_User: req.body.Device_User, // tenemos que crearlo o se gwnera y guarda directamente?
        Notifications_User: req.body.Notifications_User,
        loginAttempts: 0,
        TokenLogedUser:hashedTokenLogedUser,
        ExpiryTokenDate: DateRegisterUser,
        Block_User: false,
        Delete_User: false,
      });

      res.status(201).json({ hashedTokenLogedUser });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const usersPut = async (req: Request, res: Response) => {
  try {
    
    // tenemos que comparar el token de sesión y la contraseña maestra
    validateMiddelwareUser(req.body);

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
        loginAttempts: 0,
        TokenLogedUser:req.body.TokenLogedUser,
        ExpiryTokenDate: req.body.ExpiryTokenDate,
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


//modificar para que borre sus cuentas
export const usersCountsDelete = async (req: Request, res: Response) => {
  try {
    // tenemos que comparar el token de sesión y la contraseña maestra
    await UsersModel.destroy({
      where: {
        Id_applications: req.params.id,
      },
    });

    res.status(200).json({ message: "Aplicación eliminado" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
