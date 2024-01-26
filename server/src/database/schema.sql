CREATE DATABASE IF NOT EXISTS lock_and_stock;
USE lock_and_stock;
CREATE TABLE Admins (
  Id_Admin CHAR(36) PRIMARY KEY,
  Name_Admin VARCHAR(15) NOT NULL,
  Password_Admin CHAR(36) NOT NULL,
  Notifications_Admin VARCHAR(255) NOT NULL
);
CREATE TABLE Users (
  Id_User CHAR(36) PRIMARY KEY,
  Password_User VARCHAR(255) NOT NULL,
  Password_Master_User VARCHAR(255) NOT NULL,
  Email_User VARCHAR(30) NOT NULL,
  Name_User VARCHAR(20) NOT NULL,
  SurName_User VARCHAR(20),
  Mobile_User INT,
  Question_Security_User VARCHAR(60) NOT NULL,
  Answer_Security_User VARCHAR(30) NOT NULL,
  Device_User VARCHAR(30),
  Notifications_User VARCHAR(30),
  loginAttempts NUMBER (30),
  TokenLogedUser VARCHAR,
  ExpiryTokenDate DATETIME
  Block_User BOOLEAN,
  Delete_User BOOLEAN
);
CREATE TABLE Aplications_User (
  Id_Aplications CHAR(36) PRIMARY KEY,
  Name_Aplication VARCHAR(20) NOT NULL,
  Email_Aplication VARCHAR(30) NOT NULL,
  Category_Aplication VARCHAR(15),
  Password_Aplication CHAR(36) NOT NULL,
  Id_User CHAR(36) NOT NULL,
  FOREIGN KEY (Id_User) REFERENCES Users(Id_User)
);
CREATE TABLE Devices_User (
  Id_Device CHAR(36) PRIMARY KEY,
  Name_Device VARCHAR(255) NOT NULL,
  Date_Last_Conexion_Device DATETIME NOT NULL,
  -- Date_Register_Device DATETIME NOT NULL,
  -- Status_Device BOOLEAN NOT NULL,
  Sistem_Operative_Device VARCHAR(10),
  Ip_Direction_Device INT,
  Id_User CHAR(36) NOT NULL,
  FOREIGN KEY (Id_User) REFERENCES Users(Id_User)
);
CREATE TABLE Notifications_User (
  Id_Notification CHAR(36) PRIMARY KEY,
  Notes_Notification VARCHAR(500),
  Id_User CHAR(36) NOT NULL,
  FOREIGN KEY (Id_User) REFERENCES Users(Id_User)
);
CREATE TABLE Login_Attemps (
  Id_AttempLogin CHAR (36) NOT NULL  PRIMARY KEY,
  Location VARCHAR(255) NOT NULL,
  Device VARCHAR(255) NOT NULL,
  Sistem_Operative VARCHAR(10),
  Date datetime NOT NULL,
  Ip_Direction INT,
  Id_User CHAR(36) NOT NULL,
  FOREIGN KEY (Id_User) REFERENCES Users(Id_User)
);
INSERT INTO Admins (Id_Admin, Name_Admin, Password_Admin, Notifications_Admin) VALUES (
  '987e4567-e89b-12d3-a456-426614174001', -- Id_Admin (UUID único)
  'Admin1',                               -- Name_Admin
  'hash_contraseña_admin',                -- Password_Admin
  'Notificaciones para Admin1'            -- Notifications_Admin
);
INSERT INTO Users (
  Id_User, Password_User, Password_Master_User, Email_User,
  Name_User, SurName_User, Mobile_User, Question_Security_User,
  Answer_Security_User, Device_User, Notifications_User, Block_User, Delete_User
) VALUES (
  '123e4567-e89b-12d3-a456-426614174000', -- Id_User (UUID único)
  'hash_contraseña',                      -- Password_User
  'hash_contraseña_maestra',              -- Password_Master_User
  'usuario@example.com',                  -- Email_User
  'Nombre',                               -- Name_User
  'Apellido',                             -- SurName_User
  1234567890,                             -- Mobile_User
  '¿Cuál es tu mascota favorita?',        -- Question_Security_User
  'Fluffy',                               -- Answer_Security_User
  'MiDispositivo',                        -- Device_User
  'Notificaciones Activadas',             -- Notifications_User
  FALSE,                                  -- Block_User
  FALSE                                   -- Delete_User
);
INSERT INTO Aplications_User (
  Id_Aplications, Name_Aplication, Email_Aplication, Category_Aplication, Password_Aplication, Id_User
) VALUES (
  '234f5678-f89c-23e4-b567-526715275002', -- Id_Aplications (UUID único)
  'Aplicacion1',                          -- Name_Aplication
  'contacto@aplicacion1.com',             -- Email_Aplication
  'Productividad',                        -- Category_Aplication
  'hash_contraseña_aplicacion',           -- Password_Aplication
  '309c43c9-3a7f-4c58-80ad-4fecc4dd78a3'  -- Id_User (Debe existir en Users)
);
INSERT INTO Devices_User (
  Id_Device, Name_Device, Date_Register_Device, Date_Last_Conexion_Device,
  Status_Device, Ip_Direction_Device, Sistem_Operative_Device, Id_User
) VALUES (
  '345g6789-g89d-34f5-c678-637816386003', -- Id_Device (UUID único)
  'Dispositivo1',                         -- Name_Device
  '2023-01-01 10:00:00',                  -- Date_Register_Device
  '2023-01-15 10:00:00',                  -- Date_Last_Conexion_Device
  TRUE,                                   -- Status_Device
  19216811,                               -- Ip_Direction_Device
  'Windows 10',                           -- Sistem_Operative_Device
  '309c43c9-3a7f-4c58-80ad-4fecc4dd78a3'  -- Id_User (Debe existir en Users)
);
INSERT INTO Notifications_User (
  Id_Notification, Notes_Notification, Id_User
) VALUES (
  '456h7890-h89e-45g6-d789-748917497004', -- Id_Notification (UUID único)
  'Nota para Usuario1',                   -- Notes_Notification
  '309c43c9-3a7f-4c58-80ad-4fecc4dd78a3'  -- Id_User (Debe existir en Users)
);
SHOW TABLES IN lock_and_stock;
SELECT * FROM Admins;
SELECT * FROM Users;
SELECT * FROM Aplications_User;
SELECT * FROM Devices_User;
SELECT * FROM Notifications_User;





