import { Request, Response } from "express"


export const devicesGet = async (_req: Request, res: Response)=>{
    try {
    res.status(200).json('devices router')   
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });      
          }
    }
}