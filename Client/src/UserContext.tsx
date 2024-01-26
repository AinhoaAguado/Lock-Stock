import { createContext, useEffect, useState } from "react";
import React from 'react'
import { servicesApp } from "./services/services";



export const usersContext = createContext();



const UserContext = ({children}) => {
  const id = "323e4567-e89b-12d3-a456-426614174003";

  const [ bryan, setBryan ] = useState('')

  useEffect(()=>{
      const getUser = async () =>{
      try {

        const data = await servicesApp.getProfile();
        const findUser = data.find((a)=>{
          return a.Id_User === id
        })
        setBryan(findUser)
      } catch (error) {
        console.log(error)
      }
      }
      getUser()
  },[])
  


  return (
    <>
      <usersContext.Provider value={bryan}>
        {children}
      </usersContext.Provider>
    </>
  )
}

export default UserContext 
