import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { usersContext } from "../../UserContext";

const HeaderMenu = (): React.JSX.Element => {

  //eliminar token
  const deleteSesion =()=>{

    //metodo post que elimine el token de base de datos

    sessionStorage.removeItem('token');

  }

  //desplegar menu
  const [menu, setMenu] = useState("hidden");
  const menuOpen = () => {
    setMenu((prevMenu) => (prevMenu === "hidden" ? "absolute" : "hidden"));
  };

  //contexto
  const user = useContext(usersContext)

  return (
    <>
      <header className="w-screen bg-black h-32 flex items-center justify-between">
        <img src="/src/images/logo.svg" alt="logo" className="h-2/4 ml-4" />

        <figure className="h-full flex gap-5 items-center">
          <div className="h-full flex flex-col justify-center">
            <p className="text-primary text-2xl font-semibold">Bienvenido</p>
            <p className="text-primary text-2xl font-semibold">{user.Name_User}</p>
          </div>
          <img
            src="/src/images/user-icon.svg"
            alt="user-icon"
            className="h-3/4 mr-4"
            onClick={menuOpen}
          />
        </figure>
      </header>

      <div className={`bg-black right-10 w-48 p-5 h-20 ${menu} `}>
        <ul className="flex flex-col h-full w-full text-white ">
          <li className="flex items-center h-full justify-center">
            <Link to={"/login-admin"} onClick={deleteSesion} className="text-white hover:text-primary ">
              Cerrar Sesion
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderMenu;
