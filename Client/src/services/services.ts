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
          if (error instanceof Error) {
            throw new Error(error.message);       
          }
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






      //Accounts-user

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









      //Accounts-user
      async getAccountsUser (){
        try {
            const methodCrud = await fetch(`http://localhost:3000/Aplications_User`)

              if (!methodCrud.ok) {
                throw new Error('error para obtener los datosde las cuentas');
              }

              const response = await methodCrud.json();
              return { response }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
              }
        }
      }


      async deleteAccountUser(data: object){
        try {
          const methodCrud = await fetch(`http://localhost:3000/modal`, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(data),
            });

            if (!methodCrud.ok) {
              throw new Error('error en eliminacion de cuenta');
            }

            const response = await methodCrud.json();
  
            return response
      } catch (error) {
          if (error instanceof Error) {
              throw new Error(error.message);
            }
      }
      }







      //password generator

      async putAccountUser (data: FieldValues){
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


      //notificationMailBox
      async postNotificationUser(data: boolean){
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





      //recovery password master
      async recoveryPasswordMaster(data: FieldValues){
        try {
          const methodCrud = await fetch(`http://localhost:3000/modal`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
          });

          const response = await methodCrud.json();

          return response

        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
        }
      }




      //dashboardAdmin
      async getDashboardAdmin(){
        try {
          const methodCrud = await fetch('http://localhost:3000/dashboardAdmin');

          const response = await methodCrud.json();
          return { response }
          
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
        }
      }


      //userActivity
      async getUserActivity (){
        try {
          const methodCrud = await fetch('http://localhost:3000/userActivity');
          const response = await methodCrud.json();
          return {response};
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
        }
      }


      //dashboardIncidents
      async getDashboardIncidents (){
        try {
          const methodCrud = await fetch('http://localhost:3000/dashboardIncidents');
          const response = await methodCrud.json();
          return { response };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
        }
      }


      //notificationsAdmin
      async getNotificationsAdmin (){
        try {
          const methodCrud = await fetch('http://localhost:3000/notifications');
          const response = await methodCrud.json();
          return {response}
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
        }
      }


      //devices
      async getDevices(){
        try {
          const methodCrud = await fetch('http://localhost:3000/devices');
          const response = await methodCrud.json();
          return { response }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
        }
      }



      //DashboardAdmin
      async deleteDashboardAdmin(id){
        try {
          const methodCrud = await fetch(`http://localhost:3000/modal`,{
            method:'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(id)
          })
          const response= await methodCrud.json();
          return response
          
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
        }
      }

      async blockDashboardAdmin (id){
        try {
          const methodCrud = await fetch(`http://localhost:3000/modal`,{
            method:'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(id)
          })
          const response = await methodCrud.json();

          return response
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
        }
      }





      //pruebas


      //modalPassword
      async postModal(data: FieldValues){
        try {
          const methodCrud = await fetch(`http://localhost:3000/modal`, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(data),
            });

            if (!methodCrud.ok) {
              throw new Error('error con la contraseña');
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


