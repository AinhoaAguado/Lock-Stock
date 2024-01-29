import React, { useState } from "react";
import { servicesApp } from "../../services/services";

const Notification = ({ image, message }) => {



  
    return (
      <>

          <article className="flex justify-center gap-3">
            <div
              className="w-3/4 border border-black rounded-xl flex items-center"
              onClick={()=>servicesApp.postNotificationUser(true)}
            >
              <p className="mx-2">{message}</p>
            </div>
  
            <figure>
              <img src={image? "/src/images/notification-open-icon.svg":"/src/images/notification-close-icon.svg"} alt="notification-icon" />
            </figure>
          </article>
      </>
    );
  };
  
export default Notification;