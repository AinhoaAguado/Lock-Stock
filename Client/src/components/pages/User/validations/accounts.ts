import { string, z } from "zod";




const validateMaster = z.object({
    passwordMaster: string().min(8,{message: 'contraseña de minimo 8 caracteres'}).max(20,{message: 'contraseña de maximo 20 caracteres'}).refine((value) => /^[^'"<>%]*$/.test(value), {
        message: 'no se permiten esos caracteres como " < > % \' .',
      }),
  });


  export default validateMaster;