import bcrypt from 'bcrypt';
import { Request, Response }from 'express';
import UsersModel from '../models/UsersModel';




export const userPostMaster = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;



     let idUser =   await UsersModel.findOne({
            where: {
                Id_User: id
            },
      })

      

    const passwordId= idUser?.get('Password_Master_User')

    


    const { Password_Master_User } = req.body;



    if (!Password_Master_User &&  !id) {
        res.status(500).json({message: 'no envio credenciales'})
    }


  
        const user = await UsersModel.findOne({
            where: {
                Id_User: req.body.Id_User
            },
      })


      const IdUser = user?.get('Password_Master_User')




        const passwordDatabase = user?.get('Password_Master_User')



      if (typeof passwordDatabase === 'string' && typeof passwordId === 'string') {

        const passwordCompare = await bcrypt.compare(Password_Master_User, passwordId)


 
            res.status(200).json({mesagge: true})
        


    }

  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
