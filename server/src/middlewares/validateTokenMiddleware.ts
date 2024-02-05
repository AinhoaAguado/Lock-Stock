import jwt from "jsonwebtoken";
import {  Response, NextFunction } from "express";

// import { v4 as generateUuid } from "uuid";
import bcrypt from "bcrypt";
import "dotenv/config";
import UsersModel from "../models/UsersModel";
import { UserInterface } from "../interfaces/userInterface";
import InterfaceUser from "../interfaces/userInterface";

const validateTokenMiddleware = async (req: InterfaceUser, res: Response, next: NextFunction) => {
  try {

    const token = req.headers.authorization?.split(" ")[1];
    console.log("**TOKEN: ", token)

    if (!token) {
      console.log("si que llega, pero el token esta hasheado y da error")
      return res.status(401).json({ message: "Unauthorized token error" });
    }

    // verificar fecha y hora de expiracion 
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as jwt.JwtPayload;

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    

    let user = await UsersModel.findOne({
      where: {
        Id_User: decodedToken.Id_User,
      },
    }) as UserInterface | null; // Use UserModel | null if findOne can return null
    
    console.log(user);
    if ('user' in req) {
      console.log(req.body.Id_User);
    } else {
      console.log('User property does not exist on the req object');
    }

    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isTokenExpired = decodedToken.exp && decodedToken.exp < Date.now() / 1000;

    if (isTokenExpired) {
      await UsersModel.destroy({
        where: {
          Id_User: decodedToken.Id_User,
        },
      });

      return res.status(401).json({ message: "Unauthorized" });
    }

    const isSessionTokenValid = user.TokenLogedUser === decodedToken.TokenLogedUser;

    if (!isSessionTokenValid) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isMasterPasswordValid = await bcrypt.compare(req.body.Password_Master_User, user.Password_Master_User);

    if (!isMasterPasswordValid) {
      await UsersModel.destroy({
        where: {
          Id_User: decodedToken.Id_User,
        },
      });

      return res.status(401).json({ message: "Unauthorized" });
    }

    req.body.Id_User = user;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
  return res.json({message: "llegué hasta aqui"});
//   return next();
};

export default validateTokenMiddleware;