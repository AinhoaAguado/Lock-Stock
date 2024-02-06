import React, { useContext, useState } from "react";
import HeaderMenu from "../../templates/HeaderMenu";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { servicesApp } from "../../../services/services";
import usersContext  from "../../../UserContext";

const RecoverPasswordForm = (): React.JSX.Element => {
  const { handleSubmit, register } = useForm();
  const [password, setPassword] = useState(false);

  const user = useContext(usersContext);

  console.log(user);

  const postRecoveryPassword = async (data: FieldValues) => {
    try {
      const response = await servicesApp.recoveryPasswordMaster(data);
      if (response) {
        setPassword(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  const handleCopy = (input) => {
    navigator.clipboard.writeText(input);
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
          <h1 className="text-primary font-medium text-5xl flex-1">
            Recuperar Contraseña Maestra
          </h1>
        </div>

        <form
          className="flex flex-col w-2/4 gap-3"
          onSubmit={handleSubmit(postRecoveryPassword)}
        >
          <label
            htmlFor="answerSegurity"
            className="flex flex-col text-black h-16"
          >
            <span>Pregunta de seguridad</span>
            <input
              type="text"
              className="border border-black rounded bg-white h-full"
              id="answerSegurity"
              {...register("answerSegurity")}
            />
          </label>
          <label htmlFor="response" className="flex flex-col text-black h-16">
            <span>Respuesta</span>
            <input
              type="text"
              className="border border-black rounded bg-white h-full"
              id="response"
              {...register("response")}
            />
          </label>

          <input
            className="bg-primary border  rounded p-3 text-white font-medium text-xl"
            type="submit"
            value="Confirmar"
          />
        </form>

        <div className="flex flex-col gap-16 items-center">
          <div className="flex gap-4 justify-center items-center w-full">
            <h1 className="text-primary space-y-10 font-semibold text-4xl">
              {password ? user.Password_Master_User : "**********"}
            </h1>
            <img
              src="/src/images/copy-recovery.svg"
              alt="file-upload-icon.png"
              className="h-10 cursor-pointer"
              onClick={() =>
                handleCopy(password ? user.Password_Master_User : "**********")
              }
            />
          </div>
          {password ? (
  <>
    <small className="text-black font-bold text-lg">
      ¿Quieres establecer una nueva contraseña maestra?
    </small>

    <small className="text-primary font-bold text-lg">
      <Link to={"/password-master"} className="text-primary">
        Establecer nueva contraseña maestra
      </Link>
    </small>
  </>
) : null}




        </div>
      </section>
    </>
  );
};

export default RecoverPasswordForm;
