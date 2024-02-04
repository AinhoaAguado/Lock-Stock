import React from "react";
import HeaderLogin from "../../templates/HeaderLogin";
import { FieldValues, useForm } from "react-hook-form";
import { servicesApp } from "../../../services/services";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import recoverPasswordSchema from "./validations/recoverPasswordValidation";

const RecoverPassword = (): React.JSX.Element => {


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(recoverPasswordSchema)
    })

    const postRecover = async (dataForm: FieldValues)=>{
        try {
            console.log(dataForm)
            const data = await servicesApp.recoverPassword(dataForm);

           
            if (data) {
                
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`message: ${error.message}`)
            }
        }
    }

    
  return (
    <>
      <HeaderLogin />
      <section className="h-screen w-screen bg-white flex flex-col gap-8 justify-center items-center">
        <h1 className="text-primary text-4xl font-semibold">Recuperar Contraseña</h1>

        <form  
        className="w-1/2 flex flex-col gap-6" 
        onSubmit={handleSubmit(postRecover)}>


          <label 
          htmlFor="Password_Master_User" 
          className="w-full h-auto">
            Contraseña maestra
            <input type="text" 
            id="Password_Master_User" 
            className="border border-black rounded w-full h-8 p-2"
            {...register('Password_Master_User')}
            />
              {errors.Password_Master_User && (
              <p className="text-red-500 font-medium">{`${errors.Password_Master_User.message}`}</p>
            )}
          </label>



          <label 
          htmlFor="Answer_Security_User"
          className="w-full h-auto">
          Pregunta de Seguridad
          <input
          type="text" 
          id="Answer_Security_User" 
          className="border border-black rounded w-full h-8 p-2"
          {...register('Answer_Security_User')}
          />
                    {errors.Answer_Security_User && (
              <p className="text-red-500 font-medium">{`${errors.Answer_Security_User.message}`}</p>
            )}
          </label>



          <input type="submit" 
          value="Enviar" 
          className="w-full bg-primary text-white font-medium text-base h-10 mx-auto rounded"/>
        </form>




        <small 
        className="text-primary font-semibold text-base">
            <Link to={'/authentication-page'} className="text-primary">
            Cancelar
            </Link>
        </small>
      </section>
    </>
  );
};

export default RecoverPassword;
