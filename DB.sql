-- Active: 1717982952323@@127.0.0.1@1434@master
CREATE DATABASE Inmobiliaria

CREATE LOGIN WebPage WITH PASSWORD = 'Stalin25-10'

CREATE USER Stalin FOR LOGIN WebPage

GRANT SELECT ON Usuario TO Stalin


USE Inmobiliaria
CREATE TABLE Propiedad(
    IdPropiedad INT PRIMARY KEY IDENTITY(1,1),
    TipoPropiedad VARCHAR(50) NOT NULL,
    Ubicacion VARCHAR(100) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Descripcion TEXT,
    Tamaño INTEGER NOT NULL,
    Habitaciones INTEGER NOT NULL,
    Baños INTEGER NOT NULL,
    Estacionamiento INTEGER NOT NULL
)
CREATE TABLE Usuario(
    IdUsuario INT PRIMARY KEY IDENTITY(1,1),
    Usuario VARCHAR(50) NOT NULL,
    Contraseña VARCHAR(50) NOT NULL
)
INSERT INTO Usuario(Usuario,Contraseña)
VALUES('admin','admin')
