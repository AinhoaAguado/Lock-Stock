import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TokenAccess = ({children}:{children: string}): React.JSX.Element => {

    const [ rendering, setRendering ] = useState(true)

    const navigate = useNavigate();


    const haveToken = async ()=>{
        let token = sessionStorage.getItem('token');        
        

        try {
            const data = await fetch('',{
                method: "POST",
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(token)
            })

            const response = await data.json();

            setRendering(response)

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
              }
        }
    }

  return (
    <>
    {rendering? children: navigate('/login')}
    </>
  )
}

export default TokenAccess;