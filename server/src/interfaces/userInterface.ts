import { Request } from "express";
    export interface UserInterface{
      update(arg0: {
        loginAttempts?: number;
        hashedToken?: string;
        location?: string;
        device?: string;
        connectionTime?: Date;
        Block_User?: boolean,
        tokenLogedUser?: string
      }): unknown;
      get(): UserInterface;
      reload(): unknown;
      increment(arg0: string): unknown;
      Id_User: string;
      Password_User: string;
      Password_Master_User: string;
      Email_User: string;
      Name_User: string;
      SurName_User: string;
      Mobile_User: string;
      Question_Security_User: string;
      Answer_Security_User: string;
      Device_User: string;
      Notifications_User: string;
      loginAttempts: number;
      TokenLogedUser: string;
      ExpiryTokenDate: Date; // Use Date with uppercase D
      Block_User: boolean;
      Delete_User: boolean;
    }
    interface InterfaceUser extends Request{
      user?: UserInterface;
    }
    export default InterfaceUser;
// Export something to ensure this is a module file.
export {};
