import { Request, Response } from "express"


export const notificationsGet = async (_req: Request, res: Response)=>{
    try {
    res.status(200).json('notifications router')   
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });      
          }  
    }
}