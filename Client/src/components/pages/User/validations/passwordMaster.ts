import {z} from 'zod';


export const passwordMasterSchema  = z.object({
    password: z.string().min(12, { message: 'contraseña minimo de 12 caracteres' }).refine((value) => /^[^'"<>%]*$/.test(value), {
        message: 'no se permiten esos caracteres como " < > % \' .',
      }),
    confirmPassword: z.string().min(12, { message: 'contraseña es requerida' }),




    answer: z.string().min(12, { message: 'pregunta minimo de 12 caracteres' }).refine((value) => /^[a-zA-Z\s]+$/.test(value), {
        message: 'no se permiten numeros o caracteres como " < > % \' .',
      }),
    confirmAnswer: z.string().min(1, { message: 'pregunta es requerida' }),


    response: z.string().min(1, { message: 'respuesta es requerida' }).refine((value) => /^[a-zA-Z\s]+$/.test(value), {
        message: 'no se permiten numeros o caracteres como " < > % \' .',
      }),
    confirmResponse: z.string().min(1, { message: 'respuesta es requerida' }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Deben coincidir las contraseñas',
    path: ['confirmPassword']
  }).refine(data => data.answer === data.confirmAnswer, {
    message: 'Deben coincidir las preguntas',
    path: ['confirmAnswer']
  }).refine(data => data.response === data.confirmResponse, {
    message: 'Deben coincidir las respuestas',
    path: ['confirmResponse']
  })
  