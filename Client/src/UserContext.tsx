import { ReactNode, createContext, useEffect, useState } from "react";
import React from 'react'
import { servicesApp } from "./services/services";


//crear contexto
export const usersContext = createContext();




const UserContext = ({ children }: {children: ReactNode}): React.JSX.Element => {
  const id = "323e4567-e89b-12d3-a456-426614174003";

  const [ user, setUser ] = useState('')

  useEffect(()=>{
      const getUser = async () =>{
      try {

        const data = await servicesApp.getProfile();

        const findUser = data.find((a)=>{
          return a.Id_User === id
        })
        setUser(findUser)
        
      } catch (error) {
        console.log(error)
      }
      }
      getUser()
  },[])
  


  return (
    <>
      <usersContext.Provider value={user}>
        {children}
      </usersContext.Provider>
    </>
  )
}

export default UserContext 
