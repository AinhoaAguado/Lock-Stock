import React, { useEffect, useRef, useState, useContext } from "react";
import Navbar from "../../templates/Navbar";
import HeaderMenu from "../../templates/HeaderMenu";
import { useForm } from "react-hook-form";
import { usersContext } from "../../../UserContext";
import { servicesApp } from "../../../services/services";
import { useLoaderData, useParams } from "react-router-dom";

const PasswordGenerator = (): React.JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  let { id } = useParams();

  const user = useContext(usersContext);

      //datos de cuentas
      const { response } = useLoaderData();


      //filtrar cuenta por el id
      const filterAplication = response.find((a: { Id_Aplications: string }) => {
        return a.Id_Aplications === id;
      });
  

  // Estados
  const [view, setView] = useState("password");
  const [generatedPassword, setGeneratedPassword] = useState("");
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

  // ver contraseña
  const viewPassword = () => {
    view === "password" ? setView("text") : setView("password");
  };


  // sin id comienza con un objeto vacio
  const aplication = filterAplication || {}


  const [value, setValue] = useState(false);

useEffect(() => {
  if (!id) {
    setValue(true);
  }
}, [id]);



   // boton de copiar
   const [textPassword, setTextPassword] = useState(
    aplication.Password_Aplication
  );

  const [textName, setTextName] = useState("");
  const [generatePassword, setgeneratePassword] = useState("contraseña");



  

  

  // boton cancelar
  const cancelarEdit = () => {
    window.location.reload();
  };


  // Aquí van tus funciones de generación de contraseña
  function generarLetraAleatoria() {
    let tipoLetra = Math.random() < 0.5 ? "mayuscula" : "minuscula";
    if (tipoLetra === "mayuscula") {
      return String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
    } else {
      return String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
    }
  }

  function generarCaracterEspecial() {
    const caracteresEspeciales = [" ", ".", "/", "(", ")", "!", "$", "&", "=", "?", "¿", "^", "{", "}", "-", ",", ".", "@"];
    return caracteresEspeciales[Math.floor(Math.random() * caracteresEspeciales.length)];
  }

  function passwordRandom(longitud, incluirNumeros, incluirSimbolos) {
    let caracteres = [];
    for (let i = 0; i < longitud; i++) {
      caracteres.push(generarLetraAleatoria());
    }
    if (incluirNumeros) {
      for (let i = 0; i < Math.floor(longitud / 3); i++) {
        caracteres[i * 3] = Math.floor(Math.random() * 10).toString();
      }
    }
    if (incluirSimbolos) {
      for (let i = 0; i < Math.floor(longitud / 3); i++) {
        caracteres[i * 3 + 1] = generarCaracterEspecial();
      }
    }
    caracteres.sort(() => Math.random() - 0.5);
    return caracteres.join("");
  }

  // Función para generar contraseña automáticamente
  const generate = () => {
    let newPassword = passwordRandom(12, CheckedNumber, CheckedSpecial); // Ajusta el 12 si necesitas otra longitud predeterminada
    setgeneratePassword(newPassword);
  };



  // Función para copiar la contraseña al portapapeles
  const handleCopy = (input) => {
    navigator.clipboard.writeText(input);
  };
  
  // Manejador del formulario para enviar los datos
  const onSubmit = async (data) => {
    const formData = {
      ...data,
      Password_Aplication: generatedPassword,
    };
  
    const token = sessionStorage.getItem('accessToken');
    console.log(token);
    if (!token) {
      console.error("No se encontró el token de autenticación");
      // Manejar el caso de no tener token, por ejemplo, redirigiendo al inicio de sesión
      return;
    }
  
    try {
      await servicesApp.postApplication(formData); // Pasas el token como argumento
      alert("Cuenta añadida con éxito.");
    } catch (error) {
      console.error("Error al añadir la cuenta:", error);
    }
  };
  

  useEffect(() => {
    generate(); // Genera una contraseña al cargar el componente
  }, [CheckedNumber, CheckedSpecial]);


return (
  <>
      <HeaderMenu />
      <section className="flex">
      <Navbar generador  /> 

        <form className="w-3/4" onSubmit={handleSubmit(onSubmit)}>
          <section className="w-full flex flex-col gap-10 my-20">
            <div className="flex gap-2 justify-center items-center">
              <img
                src="/src/images/password-generator-icon.svg"
                alt="help-icon"
              />
              <h1 className="text-primary text-3xl font-semibold">
                {value === true? 'Añadir Cuenta':'Editar Cuenta'}
              </h1>
            </div>

            <section className="w-3/4 flex flex-col mx-auto gap-3">
              
              
              <label
                htmlFor="name_aplication"
                className="flex flex-col w-full text-xl gap-1"
              >
                Nombre de Aplicación
                <input
                  type="text"
                  className="w-full h-8 border border-black rounded"
                  id="name_aplication"
                  defaultValue={aplication.Name_Aplication}
                  {...register("Name_Aplication", {
                    required: true,
                    pattern: /^[a-zA-Z]+$/,
                  })} 
                />
                {errors.Name_Aplication && (
                  <p className="text-red-500 font-medium">nombre no valido</p>
                )}
              </label>





              <label
                htmlFor="email_user"
                className="flex flex-col w-full text-xl gap-1"
              >
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
                        onChange: (e) => setTextName(e.target.value),
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: 'el nombre de usuario es requerido'
                        },
                        required: {
                          value: true,
                          message: 'el nombre es requerido'
                        }
                      })}
                    />
        
                    <img
                      src="/src/images/copy-icon.svg"
                      alt="copy-icon"
                      className="h-full"
                      onClick={() => handleCopy(textName)}
                    />
                  </div>
                  {errors.Name_User && (
                      <p className="text-red-500 font-medium text-xl">
                        {errors.Name_User.message}
                      </p>
                    )}

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
                      {...register("Password_Aplication", {
                        pattern: {
                          value: /^(?:(?!['"%]).)*$/, // Regex para excluir ', ", %
                          message: 'La contraseña no puede contener los caracteres \' " %',
                        },
                        required: 'La contraseña es requerida',
                        maxLength: {
                          value: 20,
                          message: 'La contraseña debe tener como máximo 20 caracteres',
                        },
                        minLength: {
                          value: 8,
                          message: 'La contraseña debe tener al menos 8 caracteres',
                        },
                      })}
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
                  {errors.Password_Aplication && (
                      <p className="text-red-500 font-medium text-xl">
                        {errors.Password_Aplication.message}
                      </p>
                    )}

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
                      <p className="flex m-auto items-center w-3/4 overflow-y-scroll justify-center">
                        {generatePassword}
                      </p>
                      <img
                        src="/src/images/copy-icon.svg"
                        alt="copy-icon"
                        className="h-full bg-gray-200 rounded"
                        onClick={() => handleCopy(generatePassword)}
                      />
                    </div>

                    <p className="row-start-2 flex justify-center items-center">
                      Cantidad
                    </p>
                    <div className="col-start-2 row-end-3 bg-gray-200 p-2 w-10 h-8 flex justify-center items-center">
                      <input
                        className="w-8 bg-gray-200"
                        ref={numberRef}
                        defaultValue={12}
                        type="number"
                        max={20}
                      ></input>
                    </div>

                    <p className="row-start-3 flex justify-center items-center">
                      Numeros
                    </p>

                    <label className="relative cursor-pointer row-end-4 top-1 ">
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
                      <button
                        className="bg-primary text-white font-semibold "
                        onClick={generate}
                      >
                        Generar Contraseña
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
          </form>
      </section>
    </>

);
};


export default PasswordGenerator;