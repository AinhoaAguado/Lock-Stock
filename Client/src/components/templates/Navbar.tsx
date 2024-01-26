import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  cuentas?: boolean,
  generador?: boolean,
  buzon?: boolean,
  dispositivos?: boolean,
  perfil?: boolean,
  usar?: boolean,
  ayuda?: boolean,
}

const Navbar = ({ cuentas, generador, buzon, dispositivos, perfil, usar, ayuda,  }: NavbarProps): React.JSX.Element => {

 

  return (
    <>
      <nav className="w-1/4 min-h-screen bg-black border-t-8 border-green-800 flex justify-center items-start">

        <ul className="fixed flex flex-col mt-20 gap-3 text-xl">
          <li>
            <Link to={"/accounts-user"} className={`${cuentas ? 'text-primary' : 'text-white'} hover:text-primary`}>Cuentas</Link>
          </li>
          <li>
            <Link to={"/password-generator"} className={`${generador ? 'text-primary' : 'text-white'} hover:text-primary`} >Generar Contraseña</Link>
          </li>
          <li>
            <Link to={"/notification-mailbox"} className={`${buzon ? 'text-primary' : 'text-white'} hover:text-primary`}>Buzón de Notificaciones</Link>
          </li>
          <li>
            <Link to={"/connected-devices"} className={`${dispositivos ? 'text-primary' : 'text-white'} hover:text-primary`}>Dispositivos Conectados</Link>
          </li>
          <li>
            <Link to={"/user-profile"} className={`${perfil ? 'text-primary' : 'text-white'} hover:text-primary`}>Perfil de Usuario</Link>
          </li>
          <li>
            <Link to={"/how-use"} className={`${usar ? 'text-primary' : 'text-white'} hover:text-primary`}>Cómo usar Lock&Stock</Link>
          </li>
          <li>
            <Link to={"/help"} className={`${ayuda ? 'text-primary' : 'text-white'} hover:text-primary`} >Ayuda</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
