import { z } from "zod";



const recoverPasswordSchema = z.object({
    Password_Master_User: z.string().min(12, {message:'la contraseña maestra es requerida'}).refine((value) => /^[^'"<>%]*$/.test(value), {
        message: 'no se permiten esos caracteres como " < > % \' .',
      }),
    Answer_Security_User: z.string().min(12, {message: 'la pregunta es de minimo 12 caracteres'}).refine((value) => /^[^'"<>%]*$/.test(value), {
        message: 'no se permiten esos caracteres como " < > % \' .',
      }),
})


export default recoverPasswordSchema;