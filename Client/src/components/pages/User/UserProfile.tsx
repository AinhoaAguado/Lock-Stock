import React, { useContext, useRef, useState } from "react";
import Navbar from "../../templates/Navbar";
import HeaderMenu from "../../templates/HeaderMenu";
import { useLoaderData } from "react-router-dom";
import { servicesApp } from "../../../services/services";
import { usersContext } from "../../../UserContext";
import ModalPasswordMaster from "../../templates/modalPasswordMaster";
import { hashData } from "../../../services/hash";
import { FieldValues } from "react-hook-form";

const UserProfile = (): React.JSX.Element => {
  // // Almacenar el token en sessionStorage
  // sessionStorage.setItem('token', 'hola mundo');
  // let token = sessionStorage.getItem('token');

  const [name, setName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [email, setEmail] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [nameUser, setNameUser] = useState(false);

  const user = useContext(usersContext);

  //editar perfil
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const nameUserRef = useRef(null);

  const editProfile = async (ref, fieldName) => {
    try {
      await servicesApp.putProfile(
        { [fieldName]: `${ref.current.textContent}` },
        user.id
      );
    } catch (error) {
      console.error(`Error al editar ${fieldName}:`, error);
    }
  };






  const [ modal, setModal ] = useState('hidden');
  const [ edit, setEdit ] = useState(false);



  const changeModalVisibility = async () => {
    setModal((prevModal) => (prevModal === "hidden" ? "fixed" : "hidden"));
  };


  const postConfirmPassword = async (data: FieldValues) => {
    try {
      const { passwordMaster } = data;
      const newData = await hashData(passwordMaster);
      const response = await servicesApp.postModal({
        response: newData
      })


      console.log(response)

      if (response) {
        setModal((prevModal) => (prevModal === "hidden" ? "fixed" : "hidden"));



        setTimeout(()=>{

        },1*60*1000)

      }
 

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  };


  return (
    <>
      <HeaderMenu />
      <section className="flex">
        <Navbar perfil />
        <section className="w-3/4 flex flex-col gap-10 my-20 table-fixed">
          <div className="flex gap-2 justify-center items-center">
            <img src="/src/images/perfil-user-icon.svg" alt="help-icon" />
            <h1 className="text-primary text-5xl font-medium">
              Perfil de Usuario
            </h1>
          </div>
          <section className="flex w-full justify-center gap-10">
            <article>
              <figure>
                <img src="/src/images/user-icon.svg" alt="user-icon" />
              </figure>
            </article>
            <article className="flex-col w-1/2">
              <table className="w-full h-full ">
                <tr>
                  <td className="font-semibold">Nombre</td>

                  <td className="" contentEditable={name} ref={nameRef}>
                    {user.Name_User}
                  </td>

                  <td className="flex gap-3 h-full w-full items-center">
                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center"                         onClick={() => setName(!name)}
>
                      <img
                        src="/src/images/editar-icon.svg"
                        alt="edit-icon"
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center"                         onClick={() => {
                          editProfile(nameRef, "Name_User");
                          setName(!name);
                        }}
>
                      <img
                        src="/src/images/check-icon.svg"
                        alt="edit-icon"
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center">
                      <img
                        src="/src/images/eliminar-icon.svg"
                        alt="delete-icon"
                        className="cursor-pointer hover:bg-primary rounded"
                      />
                    </figure>
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold">Apellidos</td>
                  <td contentEditable={lastName}>{user.SurName_User}</td>
                  <td className="flex gap-3 h-full w-full items-center">
                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center"                         onClick={() => setLastName(!lastName)}
>
                      <img
                        src="/src/images/editar-icon.svg"
                        alt="edit-icon"
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center"                         onClick={() => {
                          editProfile(lastNameRef, "SurName_User");
                          setLastName(!lastName);
                        }}
>
                      <img
                        src="/src/images/check-icon.svg"
                        alt="edit-icon"
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center">
                      <img
                        src="/src/images/eliminar-icon.svg"
                        alt="delete-icon"
                      />
                    </figure>
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold">Correo Electrónico</td>
                  <td contentEditable={email}>{user.Email_User}</td>

                  <td className="flex gap-3 h-full w-full items-center">
                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center"                         onClick={() => setEmail(!email)}
>
                      <img
                        src="/src/images/editar-icon.svg"
                        alt="edit-icon"
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center" onClick={() => {
                          editProfile(emailRef, "Email_User");
                          setEmail(!email);
                        }}>
                      <img
                        src="/src/images/check-icon.svg"
                        alt="edit-icon"
                        
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center">
                      <img
                        src="/src/images/eliminar-icon.svg"
                        alt="delete-icon"
                      />
                    </figure>
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold">Teléfono Móvil</td>
                  <td contentEditable={mobile}>{user.Mobile_User}</td>
                  <td className="flex gap-3 h-full w-full items-center">
                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center" onClick={() => setMobile(!mobile)}>
                      <img
                        src="/src/images/editar-icon.svg"
                        alt="edit-icon"
                        
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center" onClick={() => {
                          editProfile(mobileRef, "Mobile_User");
                          setMobile(!mobile);
                        }}>
                      <img
                        src="/src/images/check-icon.svg"
                        alt="edit-icon"
                        
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center">
                      <img
                        src="/src/images/eliminar-icon.svg"
                        alt="delete-icon"
                        className="cursor-pointer hover:bg-primary rounded flex justify-center items-center"
                      />
                    </figure>
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold">Nombre de Usuario</td>
                  <td>{"bryan"}</td>

                  <td className="flex gap-3 h-full w-full items-center">
                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center">
                      <img
                        src="/src/images/editar-icon.svg"
                        alt="edit-icon"
                        className="cursor-pointer hover:bg-primary rounded"
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center">
                      <img
                        src="/src/images/check-icon.svg"
                        alt="edit-icon"
                        className="cursor-pointer hover:bg-primary rounded"
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center">
                      <img
                        src="/src/images/eliminar-icon.svg"
                        alt="delete-icon"
                        className="cursor-pointer hover:bg-primary rounded"
                      />
                    </figure>
                  </td>
                </tr>
              </table>
            </article>
          </section>
        </section>
      </section>
      <ModalPasswordMaster modal={modal} changeModal={changeModalVisibility}  />

    </>
  );
};

export default UserProfile;

