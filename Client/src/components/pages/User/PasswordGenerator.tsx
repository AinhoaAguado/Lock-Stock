import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../templates/Navbar";
import HeaderMenu from "../../templates/HeaderMenu";
import { servicesApp } from "../../../services/services";
import { useForm } from "react-hook-form";
import { useParams, useLoaderData } from "react-router-dom";
import { hashData } from "../../../services/hash";
import ModalPasswordMaster from "../../templates/modalPasswordMaster";

const PasswordGenerator = (): React.JSX.Element => {
  const id = "1";

  // ver contraseña
  const [view, setView] = useState("password");
  const viewPassword = () => {
    view === "password" ? setView("text") : setView("password");
  };

  // actualizar datos
  const editDataAplication = async (data) => {
    try {

      const { } = data;


      const newData = {

      }

      await servicesApp.patchAplications(newData, id);

      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error();
      }
    }
  };

  // cancelar nuevos datos y recuperar los antiguos
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { response } = useLoaderData();

  const aplication = response.find((a: { Id_Aplications: string }) => {
    return a.Id_Aplications === id;
  });

  const cancelarEdit = () => {
    window.location.reload();
  };

  // generar contraseña
  function generarLetraAleatoria() {
    let tipoLetra = Math.random() < 0.5 ? "mayuscula" : "minuscula";

    if (tipoLetra === "mayuscula") {
      return String.fromCharCode(
        Math.floor(Math.random() * (90 - 65 + 1)) + 65
      );
    } else {
      return String.fromCharCode(
        Math.floor(Math.random() * (122 - 97 + 1)) + 97
      );
    }
  }

  function generarCaracterEspecial() {
    let caracteresEspeciales = [
      " ",
      ".",
      "/",
      "(",
      ")",
      "!",
      "$",
      "&",
      "=",
      "?",
      "¿",
      "^",
      "{",
      "}",
      "-",
      ",",
      ".",
      "@",
    ];
    let caracterAleatorio =
      caracteresEspeciales[
        Math.floor(Math.random() * caracteresEspeciales.length)
      ];
    return caracterAleatorio;
  }

  function passwordRandom(
    longitud = 8,
    incluirNumeros = true,
    incluirSimbolos = true
  ) {
    let caracteres = [];
    let totalCaracteres = longitud;

    for (let i = 0; i < totalCaracteres; i++) {
      caracteres.push(generarLetraAleatoria());
    }

    if (incluirNumeros) {
      for (
        let i = 0;
        i < totalCaracteres / 3 && i * 3 < totalCaracteres;
        i++
      ) {
        caracteres[i * 3] = Math.floor(Math.random() * 10).toString();
      }
    }

    if (incluirSimbolos) {
      for (
        let i = 0;
        i < totalCaracteres / 3 && i * 3 + 1 < totalCaracteres;
        i++
      ) {
        caracteres[i * 3 + 1] = generarCaracterEspecial();
      }
    }

    caracteres.sort(() => Math.random() - 0.5);

    return caracteres.slice(0, longitud).join("");
  }

  const [CheckedNumber, setCheckedNumber] = useState(true);
  const [CheckedSpecial, setCheckedSpecial] = useState(true);

  const checkboxNumber = (event) => {
    setCheckedNumber(event.target.checked);
    console.log(CheckedNumber);
  };

  const checkboxSpecial = (event) => {
    setCheckedSpecial(event.target.checked);
    console.log(CheckedSpecial);
  };

  const numberRef = useRef(null);

  const generate = () => {
    let longitud = parseInt(numberRef.current.value, 10);
    let contraseña = "";

    if (longitud >= 12 && longitud <= 20) {
      contraseña = passwordRandom(longitud, CheckedNumber, CheckedSpecial);
    }

    setgeneratePassword(contraseña);
  };

  // copiar input
  const [textPassword, setTextPassword] = useState(aplication.Password_Aplication);
  const [textName, setTextName] = useState('');
  const [generatePassword, setgeneratePassword] = useState('contraseña');

  const handleCopy = (input) => {
    navigator.clipboard.writeText(input);
  };


  return (
    <>
      <HeaderMenu />
      <section className="flex">
        <Navbar generador/>

        <form className="w-3/4" onSubmit={handleSubmit(editDataAplication)} >
          <section className="w-full flex flex-col gap-10 my-20">
            <div className="flex gap-2 justify-center items-center">
              <img
                src="/src/images/password-generator-icon.svg"
                alt="help-icon"
              />
              <h1 className="text-primary text-3xl font-semibold">
                Generar Contraseñas
              </h1>
            </div>

            <section className="w-3/4 flex flex-col mx-auto gap-3">
            <label htmlFor="name_aplication" className="flex flex-col w-full text-xl gap-1">
  Nombre de Aplicación
  <input
    type="text"
    className="w-full h-8 border border-black rounded"
    id="name_aplication"
    defaultValue={aplication.Name_Aplication}
    {...register("Name_Aplication",{
      required: true,
      pattern: /^[a-zA-Z]+$/
    })}
  />
  {errors.Name_Aplication && (
    <p className="text-red-500 font-medium">nombre no valido</p>
  )}
</label>


<label htmlFor="email_user" className="flex flex-col w-full text-xl gap-1">
  Correo Electrónico
  <input
    type="text"
    id="email_user"
    defaultValue={aplication.Email_Aplication}
    className="w-full h-8 border border-black rounded"
    {...register("Email_Aplication", {
      required: true,
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,

    })}
  />
  {errors.Email_Aplication && (
    <p className="text-red-500 font-medium">correo invalido</p>
  )}
</label>

              <div className="flex">
                <div className="w-1/2">
                  <label
                    htmlFor="name_user"
                    className="flex flex-col w-5/6 text-xl gap-1"
                  >
                    Nombre de Usuario
                    </label>
<div className="flex border border-black rounded w-5/6 h-8 ">
  <input
    type="text"
    className="w-full h-full"
    id="name_user"
    defaultValue={aplication.Name_User}
    {...register("Name_User", {
      onChange: e => setTextName(e.target.value),
      pattern: /^[a-zA-Z]+$/,
    })}
  />
{errors.Name_User && (
  <p className="text-red-500 font-medium">nombre de usuario invalido</p>
)}
                    <img
                      src="/src/images/copy-icon.svg"
                      alt="copy-icon"
                      className="h-full"
                      onClick={() => handleCopy(textName)}
                    />
                  </div>




                  <label
                    htmlFor="password_aplication"
                    className="flex flex-col w-5/6 text-xl gap-1"
                  >
                    Contraseña
                  </label>
                  <div className="flex border border-black rounded w-5/6 h-8">
                    <input 
                    
                      type={view}
                      className="w-full h-full"
                      defaultValue={textPassword}
                      id="password_aplication"
                      {...register("Password_Aplication", { onChange: e => setTextPassword(e.target.value) })}
                    />

                    <img
                      src="/src/images/eye-icon.svg"
                      alt="view-icon"
                      className="h-full"
                      onClick={viewPassword}
                    />

                      <img
                        src="/src/images/copy-icon.svg"
                        alt="copy-icon"
                        className="h-full"
                        onClick={() => handleCopy(textPassword)}
                      />
                  </div>

                  <div className="flex gap-5">
                    <input
                      type="submit"
                      value="Guardar"
                      className="bg-primary text-white text-xl p-3 px-8 rounded-md font-medium mt-4"
                      
                      
                    />

                    <input
                     type="button"
                      value="Cancelar"
                      className="bg-red-700 text-white text-xl p-3 px-8 rounded-md font-medium mt-4"
                      onClick={cancelarEdit}
                    />
                  </div>
                </div>


                <div className="p-5 bg-gray-200 w-1/2 h-80 rounded">
                  <div className="grid grid-cols-2 grid-rows-auto h-full bg-white p-5 rounded justify-items-center gap-2 justify-center">
                    <div className="col-span-2 flex gap-2 justify-center w-full">
                      <p className="flex m-auto items-center w-3/4 overflow-y-scroll justify-center" >
                      {generatePassword}
                      </p>
                      <img
                        src="/src/images/copy-icon.svg"
                        alt="copy-icon"
                        className="h-full bg-gray-200 rounded" 
                        onClick={()=>handleCopy(generatePassword)}
                      />
                    </div>

                    <p className="row-start-2 flex justify-center items-center">
                      Cantidad
                    </p>
                    <div className="col-start-2 row-end-3 bg-gray-200 p-2 w-10 h-8 flex justify-center items-center">
                      <input className="w-8 bg-gray-200" ref={numberRef} defaultValue={12} type="number" max={20}></input>
                    </div>

                    <p className="row-start-3 flex justify-center items-center">
                      Numeros
                    </p>







                    <label className="relative cursor-pointer row-end-4 top-1 " >
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={CheckedNumber}
                        onChange={checkboxNumber}
            
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>





                    <p className="row-start-4 col-start-1 text-center">
                      Caracteres Especiales
                    </p>

                    <label className="relative cursor-pointer row-end-5 col-start-2 top-4">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={CheckedSpecial}
                        onChange={checkboxSpecial}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>

                    <div className="row-start-5 col-start-1 col-end-3 flex gap-2">
                      <button className="bg-primary text-white font-semibold " onClick={generate}>
                        Generar Contraseña
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </form>
        <ModalPasswordMaster />
      </section>
    </>
  );
};

export default PasswordGenerator;
