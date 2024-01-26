import React from "react";

const Notification = ({ messages, changeImage, image }) => {

  
    return (
      <>
        {messages.map((message, index) => (
          <article className="flex justify-center gap-3" key={index}>
            <div
              className="w-3/4 border border-black rounded-xl flex items-center"
              onClick={changeImage}
            >
              <p className="mx-2">{message}</p>
            </div>
  
            <figure>
              <img src={image} alt="notification-icon" />
            </figure>
          </article>
        ))}
      </>
    );
  };
  
export default Notification;