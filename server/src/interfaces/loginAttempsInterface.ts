export interface ILoginAttempt {
  Id_AttempLogin: string;
  Location: string;
  Device: string;
  Sistem_Operative?: string; // '?' indica que el campo es opcional
  DateLoginError: Date;
  Ip_Direction?: number;
  Id_User: string; // Esta debe coincidir con el tipo de Id_User en UserInterface
}