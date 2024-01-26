import { z, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validationMiddleware = (schema: z.ZodObject<{}>) => {
    return(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        schema.parse(req.body); 
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

export default validationMiddleware;