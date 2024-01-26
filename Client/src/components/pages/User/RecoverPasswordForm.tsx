import React from "react";
import HeaderMenu from "../../templates/HeaderMenu";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const RecoverPasswordForm = (): React.JSX.Element => {
  const { handleSubmit, register } = useForm();

  const postRecoveryPassword = async (data: FieldValues) => {
    try {
        console.log(data)


    } catch (error) {
        if (error instanceof Error) {
            console.error(error)
        }
    }
  };


  return (
    <>
      <HeaderMenu />
      <section className="form-password w-screen h-screen flex justify-center items-center flex-col gap-16 bg-white">
        <div className="flex gap-8 justify-center items-center">
          <img
            src="/src/images/recovery-icon.svg"
            alt="padlock-icon"
            className="h-10"
          />
          <h1
            className="
            text-primary font-medium text-5xl flex-1"
          >
            Recuperar Contraseña Maestra
          </h1>
        </div>



        <form
          className="flex flex-col w-2/4 gap-3"
          onSubmit={handleSubmit(postRecoveryPassword)}
        >
          <label htmlFor="answerSegurity" className="flex flex-col text-black h-16">
            <span>Pregunta de seguridad</span>
            <input
              type="text"
              className="border border-black rounded bg-white h-full"
              id="answerSegurity"
              {...register('answerSegurity')}
            />
          </label>
          <label htmlFor="response" className="flex flex-col text-black h-16">
            <span>Respuesta</span>
            <input
              type="text"
              className="border border-black rounded bg-white h-full"
              id="response"
              {...register('response')}
            />
          </label>

          <input
            className="bg-primary border border-black rounded p-3 text-white font-medium text-xl"
            type="submit"
            value="Confirmar"
          />
        </form>

        <div className="flex flex-col gap-16 items-center">
          <div className="flex gap-4 justify-center items-center w-full">
            <h1 className="text-primary space-y-10 font-semibold text-4xl">
              #/lisay-maggi35
            </h1>
            <img
              src="/src/images/copy-recovery.svg"
              alt="file-upload-icon.png"
              className="h-10"
            />
          </div>

          <small className="text-black font-bold text-lg">
            ¿Quieres establecer una nueva contraseña maestra?
          </small>

          <small className="text-primary font-bold text-lg">
            <Link to={'/password-master'} className="text-primary">Establecer nueva contraseña maestra</Link>
          </small>
        </div>
      </section>
    </>
  );
};

export default RecoverPasswordForm;
