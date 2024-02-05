import React, { useEffect, useRef, useState, useContext } from "react";
import Navbar from "../../templates/Navbar";
import HeaderMenu from "../../templates/HeaderMenu";
import { useForm } from "react-hook-form";
import { usersContext } from "../../../UserContext";
import { servicesApp } from "../../../services/services";

const PasswordGenerator = (): React.JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useContext(usersContext);

  

  // Estados
  const [view, setView] = useState("password");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [CheckedNumber, setCheckedNumber] = useState(true);
  const [CheckedSpecial, setCheckedSpecial] = useState(true);

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setView(view === "password" ? "text" : "password");
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
    setGeneratedPassword(newPassword);
  };

  // Función para copiar la contraseña al portapapeles
  const handleCopy = (input) => {
    navigator.clipboard.writeText(input);
    alert("Contraseña copiada al portapapeles");
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
  <Navbar generador />
  <section className="flex">
    <form className="w-3/4" onSubmit={handleSubmit(onSubmit)}>
      <section className="w-full flex flex-col gap-10 my-20">
        <div className="flex gap-2 justify-center items-center">
          <img src="/src/images/password-generator-icon.svg" alt="help-icon" />
          <h1 className="text-primary text-3xl font-semibold">Añadir Cuenta</h1>
        </div>









        <section className="w-3/4 flex flex-col mx-auto gap-3">
          {/* Nombre de la aplicación */}
          <label htmlFor="name_aplication" className="flex flex-col w-full text-xl gap-1">
            Nombre de Aplicación
            <input type="text" className="w-full h-8 border border-black rounded" {...register("Name_Aplication", { required: true })} />
            {errors.Name_Aplication && <p className="text-red-500">Nombre no válido</p>}
          </label>

          {/* Correo Electrónico */}
          <label htmlFor="email_user" className="flex flex-col w-full text-xl gap-1">
            Correo Electrónico
            <input type="email" className="w-full h-8 border border-black rounded" {...register("Email_Aplication", { required: true })} />
            {errors.Email_Aplication && <p className="text-red-500">Correo inválido</p>}
          </label>

          {/* Nombre de Usuario */}
          <label htmlFor="name_user" className="flex flex-col w-full text-xl gap-1">
            Nombre de Usuario
            <input type="text" className="w-full h-8 border border-black rounded" {...register("Name_User", { required: true })} />
            {errors.Name_User && <p className="text-red-500">Nombre de usuario inválido</p>}
          </label>

          {/* Contraseña */}
          <label htmlFor="password_aplication" className="flex flex-col w-full text-xl gap-1">
            Contraseña
            <div className="flex items-center border border-black rounded">
              <input type={view} className="w-full h-8" value={generatedPassword} readOnly />
              <button type="button" onClick={togglePasswordVisibility}>
                {view === "password" ? "Mostrar" : "Ocultar"}
              </button>
              <button type="button" onClick={() => handleCopy(generatedPassword)}>Copiar</button>
            </div>
          </label>

          <button type="button" onClick={generate}>Generar Contraseña</button>

          <div className="flex gap-5 mt-4">
            <input type="submit" value="Guardar" className="bg-primary text-white text-xl p-3 px-8 rounded-md font-medium" />
            <button type="button" onClick={() => window.location.reload()} className="bg-red-700 text-white text-xl p-3 px-8 rounded-md font-medium">Cancelar</button>
          </div>

          {/* Aquí comienzan los estilos ajustados para el generador de contraseña */}
          <div className="p-5 bg-gray-200 w-1/2 h-80 rounded mx-auto">
            <div className="grid grid-cols-2 grid-rows-auto h-full bg-white p-5 rounded justify-items-center gap-2 justify-center">
              <div className="col-span-2 flex gap-2 justify-center w-full">
                <p className="flex m-auto items-center w-3/4 overflow-y-scroll justify-center">
                  {generatedPassword}
                </p>
                <img
                  src="/src/images/copy-icon.svg"
                  alt="copy-icon"
                  className="h-full bg-gray-200 rounded"
                  onClick={() => handleCopy(generatedPassword)}
                />
              </div>

              <p className="row-start-2 flex justify-center items-center">
                Cantidad
              </p>
              <div className="col-start-2 row-end-3 bg-gray-200 p-2 w-10 h-8 flex justify-center items-center">
                {/* Aquí asumimos que hay un input de referencia para la longitud que no estaba en el componente actual */}
                {/* Asegúrate de agregar el ref necesario o ajustar según tu implementación actual */}
              </div>

              {/* Asumiendo que las casillas de verificación y el botón de generar están implementados */}
              {/* Ajusta según tu implementación actual */}
            </div>
          </div>
          {/* Fin de los estilos ajustados */}
        </section>
      </section>
    </form>
  </section>
</>

);
};


export default PasswordGenerator;