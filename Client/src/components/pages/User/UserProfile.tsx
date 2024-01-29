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





  //datos de usuario
  const user = useContext(usersContext);


  //editar perfil

  const [ edit, setEdit ] = useState(false);

  const [name, setName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [email, setEmail] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [nameUser, setNameUser] = useState(false);

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

      setModal('flex')

    } catch (error) {
      console.error(`Error al editar ${fieldName}:`, error);
    }
  };


  //modal 
  const [ modal, setModal ] = useState('hidden');

  const changeModalVisibility = async () => {
    setModal((prevModal) => (prevModal === "hidden" ? "fixed" : "hidden"));
  };


  const postConfirmPassword = async (data: FieldValues) => {
    try {
      const { passwordMaster } = data;

      const response = await servicesApp.postModal({
        password: await hashData(passwordMaster)
      })


      if (response) {
        setEdit(true)
        setModal((prevModal) => (prevModal === "hidden" ? "fixed" : "hidden"));
        setTimeout(()=>{
          setEdit(false)
        },1*60*5000)
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
    <figure
      className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center"
      onClick={() => {
        edit ? setName(!name) : setModal('fixed');
      }}
    >
      <img src="/src/images/editar-icon.svg" alt="edit-icon" />
    </figure>

    <figure
      className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center"
      onClick={() => {
        if (edit) {
          editProfile(nameRef, "Name_User");
          setName(!name);
        } else {
          setModal('fixed');
        }
      }}
    >
      <img src="/src/images/check-icon.svg" alt="edit-icon" />
    </figure>


  </td>
</tr>












                <tr>
                  <td className="font-semibold">Apellidos</td>
                  <td contentEditable={lastName}>{user.SurName_User}</td>
                  <td className="flex gap-3 h-full w-full items-center">
                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center"                         onClick={() => {edit?setLastName(!lastName):setModal('fixed')}}
>
                      <img
                        src="/src/images/editar-icon.svg"
                        alt="edit-icon"
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center"                         onClick={() => {
                      if (edit) {
                        editProfile(lastNameRef, "SurName_User");
                        setLastName(!lastName);
                      }else{
                        setModal('fixed')
                      }
                       
                        }}
>
                      <img
                        src="/src/images/check-icon.svg"
                        alt="edit-icon"
                      />
                    </figure>

                  </td>
                </tr>
















                <tr>
                  <td className="font-semibold">Correo Electrónico</td>
                  <td contentEditable={email}>{user.Email_User}</td>

                  <td className="flex gap-3 h-full w-full items-center">
                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center"                         onClick={() => {edit?setEmail(!email):setModal('fixed')}}
>
                      <img
                        src="/src/images/editar-icon.svg"
                        alt="edit-icon"
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center" onClick={() => {
                      if (edit) {
                        editProfile(emailRef, "Email_User");
                        setEmail(!email);
                      } else {
                        setModal('fixed')
                      }
                      
                        }}>
                      <img
                        src="/src/images/check-icon.svg"
                        alt="edit-icon"
                        
                      />
                    </figure>

                  
                  </td>
                </tr>











                <tr>
                  <td className="font-semibold">Teléfono Móvil</td>
                  <td contentEditable={mobile}>{user.Mobile_User}</td>
                  <td className="flex gap-3 h-full w-full items-center">
                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center" onClick={() => {edit?setMobile(!mobile):setModal('fixed')}}>
                      <img
                        src="/src/images/editar-icon.svg"
                        alt="edit-icon"
                        
                      />
                    </figure>

                    <figure className="h-8 w-8 p-1 cursor-pointer hover:bg-primary rounded flex justify-center items-center" onClick={() => {
                      if (edit) {
                        editProfile(mobileRef, "Mobile_User");
                        setMobile(!mobile); 
                      } else {
                        setModal('fixed')
                      }
                        }}>
                      <img
                        src="/src/images/check-icon.svg"
                        alt="edit-icon"
                        
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

            
                  </td>
                </tr>
              </table>
            </article>
          </section>
        </section>
      </section>
      <ModalPasswordMaster modal={modal} changeModal={changeModalVisibility}  postData={postConfirmPassword}/>

    </>
  );
};

export default UserProfile;

