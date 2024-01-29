import React from "react";
import HeaderMenu from "../../templates/HeaderMenu";
import Navbar from "../../templates/Navbar";
import Notification from "../../molecules/Notification";
import { useLoaderData } from 'react-router-dom';

const NotificationMailbox = (): React.JSX.Element => {
  // Obtener notificaciones
  const { response } = useLoaderData();


  //numero de notificaiones
  const notifications = response.map((a)=>{
    return a.message
  })



  return (
    <>
      <HeaderMenu />
      <section className="flex">
        <Navbar buzon />
        <section className="w-3/4 flex flex-col gap-10 my-20">
          <div className="flex gap-2 justify-center items-center">
            <h1 className="text-primary text-5xl font-semibold">{notifications.length}</h1>
            <img src="/src/images/mailbox-icon.svg" alt="help-icon" />
            <h1 className="text-primary text-3xl font-semibold">
              Buzón de Notificaciones
            </h1>
          </div>
          <section className="flex flex-col w-full h-full gap-5">
            {
              response.map((a, b)=>{
                return <Notification image={a.boolean} message={a.message} key={b}/>
              })
            }

          </section>
        </section>
      </section>
    </>
  );
};

export default NotificationMailbox;
