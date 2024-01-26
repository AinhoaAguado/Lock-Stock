import React, { useState } from "react";
import HeaderMenu from "../../templates/HeaderMenu";
import Navbar from "../../templates/Navbar";
import Notification from "../../molecules/Notification";
import { useLoaderData } from 'react-router-dom'

const NotificationMailbox = (): React.JSX.Element => {

  const { response } = useLoaderData()

  const notifications = response.map((a)=>{
    return a.Notes_Notification
  })
  

  const [image, setImage] = useState("/src/images/notification-open-icon.svg");
  
  const changeImage = () => {
    setImage("/src/images/notification-close-icon.svg");
  };



  return (
    <>
      <HeaderMenu />
      <section className="flex">
        <Navbar buzon/>
        <section className="w-3/4 flex flex-col gap-10 my-20">
          <div className="flex gap-2 justify-center items-center">
            <h1 className="text-primary text-5xl font-semibold">3</h1>
            <img src="/src/images/mailbox-icon.svg" alt="help-icon" />
            <h1 className="text-primary text-3xl font-semibold">
              Buzón de Notificaciones
            </h1>
          </div>
          <section className="flex flex-col w-full h-full gap-5"> 
          
          {notifications.map((messages, index) => (
          <Notification key={index} messages={messages} changeImage={changeImage} image={image} />
        ))}
          

          </section>
        </section>
      </section>
    </>
  );
};

export default NotificationMailbox;
