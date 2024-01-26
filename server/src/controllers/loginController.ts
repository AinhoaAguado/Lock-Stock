import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UsersModel";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import LoginAttempsModel from '../models/LoginAttempsModel';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { Name_User, Password_User } = req.body;
  const error400 = res.status(400).json({ message: "Credenciales Inválidas"});
  const username = Name_User;
  const password = Password_User;
  
  if (!username || !password) {
    return error400;
    return error400;
  }

  let user = await User.findOne({
    where: {
      username: {
        [Op.eq]: username,
      },
    },
  });

  if (!user) {
    return error400;
  }

  

  const maxAttempts = 5;
  let currentAttempts = user.get("LoginAttempts");
  
  if (typeof currentAttempts === "number" && currentAttempts >> maxAttempts) {
    return error400;
  }


  const PasswordInstance = user.get({ plain: true });
  const isPasswordValid = await bcrypt.compare(
    password,
    PasswordInstance.Password_User
  );

  if (!isPasswordValid && typeof currentAttempts === "number") {
    user.set("LoginAttempts", currentAttempts + 1);

   await LoginAttempsModel.create({
      Id_User: user,
      Location: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      Device: req.headers["user-agent"],
      Sistem_Operative: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      Date: new Date(),
      // Ip_Direction:,
    })



    if (typeof currentAttempts === "number" && currentAttempts == maxAttempts) {
    
      const secretKey = process.env.SECRET_KEY!;  
      const userInstance = user.get({ plain: true });
      const token = jwt.sign(
        {
          Name_User: userInstance.Name_User,
          Location: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
          Date: new Date(),
        },
        secretKey,
        { expiresIn: "1h" }
      );
      
      const hashedToken = await bcrypt.hash(token, 10);
      user.set("TokenUserLoged", hashedToken);
      user.set("Block_User", true);
      user.set("Location_", req.headers["x-forwarded-for"] || req.socket.remoteAddress);
      user.set("Device_User", req.headers["user-agent"]);
      user.set("Date", new Date());
      await user.save();  

      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_ADMIN_Usr,
          pass: process.env.EMAIL_ADMIN_Pss,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_ADMIN_Usr,
        to: userInstance.Email_User,
        subject: "Desbloquea tu cuenta",
        text: `Hemos bloqueado tu usuario por un elevado número de intentos de inicio de sesión sin éxito. Si has sido tú, haz click en este enlace para desbloquear tu cuenta: ${process.env.FRONTEND_URL}/unblock/${token}`,
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
      return error400;
    }    
    return error400;
  }


  
  if (isPasswordValid) {
    const secretKey = process.env.SECRET_KEY!; 

    const userInstance = user.get({ plain: false });
    const token = jwt.sign(
      {
        username: userInstance.Name_User,
        location: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
        // device: req.headers["user-agent"],
        connectionTime: new Date()
        //Ip_Direction: 
      },
      secretKey,
      { expiresIn: "1h" }
    );

    const hashedToken = await bcrypt.hash(token, 10);
    user.set("hashedToken", hashedToken);
    user.set("loginAttempts", 0) ;
    user.set("Block_User", false) ;
    user.set("device", req.headers["user-agent"]);
    user.set("location", req.headers["x-forwarded-for"] || req.socket.remoteAddress);
    //Ip_Direction: 
    user.set("connectionTime", new Date());
    //direccion mac pdt
    await user.save();
    
    return res.json({ message: "Logged in successfully", token });
  };
  return error400;
}
