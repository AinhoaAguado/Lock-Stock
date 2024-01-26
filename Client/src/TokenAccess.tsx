import React, { useState } from 'react'

const TokenAccess = ({children}) => {

    const [ rendering, setRendering ] = useState(true)
    


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
    {rendering? children: <h1 className='text-center w-screen'>tiene que hacer login</h1>}
    </>
  )
}

export default TokenAccess;