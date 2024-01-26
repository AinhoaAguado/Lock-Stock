import React from "react";
import HeaderMenu from "../../templates/HeaderMenu";
import NavbarAdmin from "../../templates/NavbarAdmin";

const NotificationAdmin = (): React.JSX.Element => {
  return (
    <>
                 <HeaderMenu />
    <section className="flex">
        <NavbarAdmin notifications/>

        <section className="w-full min-h-screen flex flex-col gap-10 py-20 bg-gradient-to-b from-green-700 to-black">
          <div className="flex gap-2 justify-center items-center">
            <h1 className="text-white text-3xl font-semibold">
              Buzón de Notificaciones
            </h1>
          </div>
          <section className="flex flex-col w-full h-full gap-5"> 

            <article className="flex justify-center gap-3">
              <div className="w-3/4 border border-black rounded-xl flex items-center text-black bg-white ">
                <p className="mx-2">Nueva Contraseña</p>
              </div>
              <figure>
                <img src="/src/images/notification-white-icon.svg" alt="notification-icon" />
              </figure>
            </article>



            <article className="flex justify-center gap-3">
              <div className="w-3/4 border border-black rounded-xl flex items-center text-black bg-white ">
                <p className="mx-2">Nueva Contraseña</p>
              </div>
              <figure>
                <img src="/src/images/notification-yellow-icon.svg" alt="notification-icon" />
              </figure>
            </article>


            <article className="flex justify-center gap-3">
              <div className="w-3/4 border border-black rounded-xl flex items-center text-black bg-white ">
                <p className="mx-2">Nueva Contraseña</p>
              </div>
              <figure>
                <img src="/src/images/notification-white-icon.svg" alt="notification-icon" />
              </figure>
            </article>



            <article className="flex justify-center gap-3">
              <div className="w-3/4 border border-black rounded-xl flex items-center text-black bg-white ">
                <p className="mx-2">Nueva Contraseña</p>
              </div>
              <figure>
                <img src="/src/images/notification-yellow-icon.svg" alt="notification-icon" />
              </figure>
            </article>



            <article className="flex justify-center gap-3">
              <div className="w-3/4 border border-black rounded-xl flex items-center text-black bg-white ">
                <p className="mx-2">Nueva Contraseña</p>
              </div>
              <figure>
                <img src="/src/images/notification-white-icon.svg" alt="notification-icon" />
              </figure>
            </article>



            <article className="flex justify-center gap-3">
              <div className="w-3/4 border border-black rounded-xl flex items-center text-black bg-white ">
                <p className="mx-2">Nueva Contraseña</p>
              </div>
              <figure>
                <img src="/src/images/notification-yellow-icon.svg" alt="notification-icon" />
              </figure>
            </article>






          </section>
        </section>
        </section>
    </>
  );
};

export default NotificationAdmin;
