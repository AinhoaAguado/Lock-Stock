import React from "react";
import { Link } from "react-router-dom";

interface navbarAdmin {
  dashboard?: boolean,
  activity?: boolean,
  incidents?: boolean,
  notifications?: boolean,
}

const NavbarAdmin = ({dashboard, activity, incidents, notifications}: navbarAdmin): React.JSX.Element => {



  return (
    <>
      <nav className="w-1/3 min-h-screen bg-black border-t-8 border-green-800 flex justify-center items-start">

        <ul className="fixed flex flex-col mt-20 gap-3 text-xl">
          <li >
            <Link to={"/dashboard-admin"} className={`${dashboard? 'text-primary': 'text-white'} hover:text-primary`}>Gestión de usuarios</Link>
          </li>
          <li>
            <Link to={"/user-activity"} className={`${activity? 'text-primary': 'text-white'} hover:text-primary`}>Registro de actividad
de usuarios</Link>
          </li>
          <li>
            <Link to={"/dashboard-incidents"} className={`${incidents? 'text-primary': 'text-white'} hover:text-primary`}>Incidencias</Link>
          </li>
          <li>
            <Link to={"/notification-admin"} className={`${notifications? 'text-primary': 'text-white'} hover:text-primary`}>Buzón de notificiones</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavbarAdmin;
