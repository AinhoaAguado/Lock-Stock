import { Request, Response } from "express"


export const usersGet = async (_req: Request, res: Response)=>{
    try {
    res.status(200).json('users router')   
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });      
          }   
    }
}



export const usersPost =async (req: Request, res: Response)=>{
    try {
        const {  } = req.body;

        res.status(200).json()
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });      
          }
    }
}