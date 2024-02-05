import "express";

// Primero, definimos la interfaz para el objeto deviceInfo
export interface DeviceInfo {
  deviceType: string;
  deviceModel:string,
  osName: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
  ip: unknown;
  // Puedes agregar más campos según lo que tu middleware extraiga del user agent
}

// Luego, extendemos la interfaz Request de Express para añadir deviceInfo
declare module 'express-serve-static-core' {
  interface Request {
    deviceInfo?: DeviceInfo;
  }
} 