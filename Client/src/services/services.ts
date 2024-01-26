import { FieldValues } from "react-hook-form";


class Services {
    constructor() {}


    //profile
    async getProfile () {
        try {
            const method = await fetch('http://localhost:3000/users');
            const data = await method.json();
            return data
        } catch (error) {
          throw new Error(error.message);
        }
    }


    async postProfile (data: FieldValues) {
      try {
          const method = await fetch('http://localhost:3000/users',{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(data)
          });
          const response = await method.json();

          return response
      } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
      }
  }



    async putProfile(edit: object, id: number) {
        try {
          const methodUser = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(edit),
          });

          const methodAplication = await fetch(`http://localhost:3000/Devices_User/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(edit),
          });
      

          if (!methodUser.ok) {
            throw new Error('Response not ok');
          }
      
          const data = await methodUser.json();
          return { data };
      
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
              }
        }
      }






      //Aplications_User

      async deleteAplications (id: number){
        try {
            const methodCrud = await fetch(`http://localhost:3000/Devices_User/${id}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' }
              });

              if (!methodCrud.ok) {
                throw new Error('Error en la peticion');
              }

              const response = await methodCrud.json();
              return { response }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
              }
        }
      }

      async getAplications (){
        try {
            const methodCrud = await fetch(`http://localhost:3000/Aplications_User`)

              if (!methodCrud.ok) {
                throw new Error('Error en la peticion');
              }

              const response = await methodCrud.json();
              return { response }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
              }
        }
      }


      async postAplications (data: FieldValues){
        try {
            const methodCrud = await fetch(`http://localhost:3000/Devices_User`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data),
              });

              if (!methodCrud.ok) {
                throw new Error('Error en la peticion');
              }

              const response = await methodCrud.json();
              return { response }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
              }
        }
      }


      async patchAplications(data: FieldValues, id: string){
        try {

            const methodCrud= await fetch(`http://localhost:3000/Aplications_User/${id}`, {
              method: 'PATCH',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(data),
            });
    
            if (!methodCrud.ok) {
              throw new Error('Error en la peticion');
            }
        
            const response = await methodCrud.json();

            return { response };

          } catch (error) {
              if (error instanceof Error) {
                  throw new Error(error.message);
                }
          }
  
      }






      //Users
      async getUser(){
        try {
          const method = await fetch('')
          const {response} = await method.json();
          return {response};
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      }


      async postUser(data: FieldValues){
        try {
          const method = await fetch('',{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(data)  
          })
          const response = await method.json();
          return response;

        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      }




      //notifications user


      async getNotifications (){
        try {
            const methodCrud = await fetch(`http://localhost:3000/Notifications_User`)

              if (!methodCrud.ok) {
                throw new Error('Error en la peticion');
              }

              const response = await methodCrud.json();
              return { response }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
              }
        }
      }

      async postNotifications (data: FieldValues){
        try {
            const methodCrud = await fetch(`http://localhost:3000/Notifications_User`,{
              method: 'POST',
              headers: {'content-type':'application/json'},
              body: JSON.stringify(data)
            })

              if (!methodCrud.ok) {
                throw new Error('Error en la peticion');
              }

              const response = await methodCrud.json();

              return response 
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
              }
        }
      }












      //pruebas
      async postModal(data: FieldValues){
        try {
          const methodCrud = await fetch(`http://localhost:3000/modal`, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(data),
            });

            if (!methodCrud.ok) {
              throw new Error('Error en la peticion');
            }

            const response = await methodCrud.json();

            return response
      } catch (error) {
          if (error instanceof Error) {
              throw new Error(error.message);
            }
      }
      }

      async postDelete(data: object){
        try {
          const methodCrud = await fetch(`http://localhost:3000/modal`, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(data),
            });

            if (!methodCrud.ok) {
              throw new Error('Error en la peticion');
            }

            const response = await methodCrud.json();

            return response
      } catch (error) {
          if (error instanceof Error) {
              throw new Error(error.message);
            }
      }
      }


}





export const servicesApp = new Services; 


