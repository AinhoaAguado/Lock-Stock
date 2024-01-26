import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { hashData } from "../../services/hash";
import { Link } from "react-router-dom";
import { servicesApp } from "../../services/services";
import { zodResolver } from "@hookform/resolvers/zod";
import validateMaster from "../pages/User/validations/accounts";


interface modalInterface {
  modal: string,
  changeModal: (change: string)=>void,
  password?: ()=>void,
  postData?: SubmitHandler<FieldValues>; 
  userData?: (change: boolean)=>void
}

const ModalPasswordMaster = ({ modal, changeModal, password, postData }: modalInterface): React.JSX.Element => {


  const { handleSubmit, register, formState: { errors }} = useForm({
    resolver: zodResolver(validateMaster)
  });


  //cerrar modal
  const closeModal =()=>{
    changeModal('hidden')
  }




  return (
    <>
      <section className={`${modal} top-0 left-0 h-full w-full flex justify-center items-center z-50`}>
        <article className="relative left-40 h-80 w-2/4 rounded bg-white border-4 border-green-700 flex flex-col justify-center items-center">


<figure className="w-11/12 flex justify-end cursor-pointer" onClick={closeModal}>
        <img  src="/src/images/plus-icon.svg" alt="plus-icon" />
        </figure>
          <p className="text-center text-primary font-semibold">Contraseña Maestra</p>

          <form
            className="w-11/12 h-10/12 flex flex-col gap-4 mx-auto"
            onSubmit={handleSubmit(postData)}
          >
            <label htmlFor="passwordMaster">
              <span>Contraseña</span>
              <input
                type="password"
                id="passwordMaster"
                className="w-full h-8 border border-black rounded"
                {...register("passwordMaster")}
              />
                {errors.passwordMaster && (
              <p className="text-red-500 font-medium">{`${errors.passwordMaster.message}`}</p>
            )}
            </label>
            <input
              type="submit"
              value="Confirmar"
              className="bg-green-700 text-white font-medium w-full h-10 rounded" onClick={password}
            />
          </form>

          <small className="text-black text-base font-semibold">
            ¿Has olvidado tu contraseña maestra?
          </small>
          <Link to={'/recovery-password'}>
          <small className="text-primary text-base font-semibold">
            Recuperar Contraseña
          </small>
          </Link>
        </article>
      </section>
    </>
  );
};

export default ModalPasswordMaster;

