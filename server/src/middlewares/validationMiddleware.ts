import { z, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';



export const validationMiddleware = (schema: z.ZodObject<{ user_uuid: z.ZodEffects<z.ZodString, string, string>; network: z.ZodEffects<z.ZodString, string, string>; latitude: z.ZodNumber; longitude: z.ZodNumber; rtt: z.ZodNumber; downlink: z.ZodNumber; }, "strip", z.ZodTypeAny, { user_uuid: string; network: string; latitude: number; longitude: number; rtt: number; downlink: number; }, { user_uuid: string; network: string; latitude: number; longitude: number; rtt: number; downlink: number; }>) => {
    return(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        schema.parse(req.body); // Reemplaza req.body con el objeto que deseas validar
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({
                error: 'Validation failed',
                details: (error instanceof Error) ? error.message : 'Error desconocido',
            });
        } else {
        next(error);
    }
}
}};