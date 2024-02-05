import { Request, Response } from "express";
import AplicationsUsersModel from "../models/AplicationsUsersModel";
import db from "../database/db";
import validateTokenMiddleware from "../middleware/validateTokenMiddleware";

// Agrega el middleware de validación de token donde sea necesario
// Por ahora, lo incluiremos en el ejemplo de usersPostApplication para demostrar su uso

export const usersGetApplications = async (_req: Request, res: Response) => {
  try {
    const users = await AplicationsUsersModel.findAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las aplicaciones" });
  }
};

export const usersGetByIdApplications = async (req: Request, res: Response) => {
  try {
    const user = await AplicationsUsersModel.findOne({
      where: { Id_User: req.params.id },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Aplicación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Usando el middleware para asegurar que el usuario está autenticado y extraer el Id_User
export const usersPostApplication = async (req: Request, res: Response) => {
  console.log("Authorization header:", req.headers.authorization);
  console.log("Body recibido en POST /applications:", req.body);
  try {
    const userId = (req as any).user.Id_User; // Extrae el Id_User añadido por el middleware

    // Añade el Id_User al cuerpo de la solicitud
    const applicationData = { ...req.body, Id_User: userId };

    const newApplication = await AplicationsUsersModel.create(applicationData);
    res.status(201).json(newApplication);
  } catch (error) {
    console.error("Error al crear la aplicación:", error);
    if (error instanceof db.Sequelize.ValidationError) {
      console.error("Errores de validación:", error.errors);
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const usersPutApplication = async (req: Request, res: Response) => {
  try {
    const updatedApplication = await AplicationsUsersModel.update(req.body, {
      where: { Id_Aplications: req.params.id },
    });

    if (updatedApplication[0] === 1) {
      res.status(200).json({ message: "Aplicación actualizada" });
    } else {
      res.status(404).json({ message: "Aplicación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const usersDeleteApplications = async (req: Request, res: Response) => {
  try {
    const deletedRows = await AplicationsUsersModel.destroy({
      where: { Id_Aplications: req.params.id },
    });

    if (deletedRows === 1) {
      res.status(200).json({ message: "Aplicación eliminada" });
    } else {
      res.status(404).json({ message: "Aplicación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
