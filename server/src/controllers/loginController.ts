import { Request, Response } from "express";
import User from "../models/UsersModel";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from 'jsonwebtoken';
import LoginAttemptsModel from "../models/LoginAttempsModel";
import { ILoginAttempt } from "../../loginAttempsInterface"; // Asumiendo que tienes un archivo de interfaces
import { v4 as generateUuid } from 'uuid';
import { UserInterface } from "../../userInterface"; // Asume que tienes una interfaz de usuario definida

export const login = async (req: Request, res: Response) => {
  const { Email_User, Password_User } = req.body;
  const error400 = () => res.status(400).json({ message: "Credenciales Inválidas" });

  if (!Email_User || !Password_User) {
    return error400();
  }

  let user = await findUserByEmail(Email_User);
  if (!user) {
    console.log("Usuario no encontrado");
    await createLoginAttempt(null, req); // Intento fallido
    return error400();
  }

  if (user.Block_User) {
    return res.status(400).json({ message: "Usuario bloqueado" });
    // return error400();
  }

  if (!(await isPasswordValid(user, Password_User))) {
    await handleFailedLoginAttempt(user, req, res);
    return error400();
  }

  await resetLoginAttempts(user);
  const token = await generateUserToken(user, req);
  await updateUserTokenInfo(user, token, req);

  return res.json({ message: "Logged in successfully", accessToken: token });
};

async function findUserByEmail(email: string): Promise<UserInterface | null> {
  return User.findOne({
    where: { Email_User: { [Op.eq]: email } },
  }) as Promise<UserInterface | null>;
}

async function isPasswordValid(user: UserInterface, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.Password_User);
}

async function handleFailedLoginAttempt(user: UserInterface, req: Request, res: Response): Promise<void | Response> {
  const maxAttempts = 5;
  let currentAttempts = await user.increment('loginAttempts');
  await user.reload();
  console.log("Intentos de login después de incrementar:", user.loginAttempts);

  await createLoginAttempt(user.Id_User, req);

  if (typeof currentAttempts === "number" && currentAttempts > maxAttempts) {
    console.log("*************** Current Login: >5", currentAttempts);
    // return error400;
    return res.status(400).json({ message: "error en if mayor que 5"});
  }
  
  if (typeof currentAttempts === "number" && currentAttempts == maxAttempts) {
    let tokenBlockUser = await generateUserToken(user, req);
    console.log('**************USER:', "HOLA MUNDOOOOOOOOOOOOOOOOOO")
    await blockUser(user, tokenBlockUser);
    await user.update(user);
  }
  console.log('**************USER:', "HOLA MUNDOOOOOOOOOOOOOOOOOO <5 ")

}

async function resetLoginAttempts(user: UserInterface): Promise<void> {
  await user.update({ loginAttempts: 0 });
}

async function generateUserToken(user: UserInterface, req: Request): Promise<string> {
  const SECRET_KEY = process.env.SECRET_KEY;
  if (!SECRET_KEY) {
    throw new Error("La clave secreta no está definida en las variables de entorno.");
  }

  // Incluye el Id_User como parte del payload del JWT
  const tokenPayload = {
    Id_User: user.Id_User,
    // Email_User: user.Email_User,
    location: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    device: req.headers["user-agent"],
    connectionTime: new Date(),
  };

  const signOptions: SignOptions = {
    expiresIn: "86400s" 
  };

  return jwt.sign(tokenPayload, SECRET_KEY, signOptions);
}

async function updateUserTokenInfo(user: UserInterface, token: string, req: Request): Promise<void> {
  const hashedToken = await bcrypt.hash(token, 10);
  const location = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const locationString = Array.isArray(location) ? location.join(", ") : location;
  await user.update({
    hashedToken,
    location: locationString,
    device: req.headers["user-agent"],
    connectionTime: new Date(),
  });
} 

async function createLoginAttempt(userId: string | null, req: Request): Promise<void> {
  console.log("Creando intento de login para usuario:", userId);
  let ipDirection: number | undefined = undefined;
  if (req.socket.remoteAddress) {
    ipDirection = parseInt(req.socket.remoteAddress, 10);
    ipDirection = isNaN(ipDirection) ? undefined : ipDirection;
  }

  const loginAttemptData: ILoginAttempt = {
    Id_AttempLogin: generateUuid(),
    Location: typeof req.headers["x-forwarded-for"] === 'string' 
      ? req.headers["x-forwarded-for"] 
      : req.socket.remoteAddress as string,
    Device: req.headers["user-agent"] as string,
    DateLoginError: new Date(),
    Ip_Direction: ipDirection,
    Id_User: userId ?? 'default-user-id', // Utiliza un ID de usuario predeterminado o maneja el caso 'null' según la lógica de tu aplicación
    // Si tienes
  };

  await LoginAttemptsModel.create(loginAttemptData as any); // Ya no necesitas 'as any' si la interfaz coincide con el modelo
}

async function  blockUser(user: UserInterface, tokenBlockUser: string){
  console.log('******************user:', user)
  await user.update({ 
    ...user,
    block_User: 1,
    tokenLogedUser: tokenBlockUser
  });

}

      // const transporter = nodemailer.createTransport({
      //   service: process.env.EMAIL_SERVICE,
      //   auth: {
      //     user: process.env.EMAIL_ADMIN_Usr,
      //     pass: process.env.EMAIL_ADMIN_Pss,
      //   },
      // });

      // const mailOptions = {
      //   from: process.env.EMAIL_ADMIN_Usr,
      //   to: userInstance.Email_User,
      //   subject: "Desbloquea tu cuenta",
      //   text: `Hemos bloqueado tu usuario por un elevado número de intentos de inicio de sesión sin éxito. Si has sido tú, haz click en este enlace para desbloquear tu cuenta: ${process.env.FRONTEND_URL}/unblock/${token}`,
      //   //enviar url de edsbloqueo y datos de ubicacion y dispositivo desde donde se bloqueo
      // };
      
      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log(`Email sent: ${info.response}`);
      //   }
      // });
      // return error400;
