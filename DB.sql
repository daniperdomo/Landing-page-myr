-- Active: 1717970931403@@127.0.0.1@3306@inmobiliaria
CREATE DATABASE Inmobiliaria

USE Inmobiliaria

CREATE TABLE Propiedad(
    tipo_id ENUM('V','P','J','E','G','C'),
    cedula VARCHAR(20) not NULL,
    rif VARCHAR(20) NOT NULL,
    asiento VARCHAR(20) NOT NULL,
    n_protocolo VARCHAR(20) NOT NULL,
    f_real VARCHAR(20) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    idPropiedad INT AUTO_INCREMENT,
    sector VARCHAR(50) NOT NULL,
    residentialcomplex VARCHAR(50) NOT NULL,
    contactname VARCHAR(50) NOT NULL,
    precio VARCHAR(25) not NULL,
    tipo_oferta ENUM('alquiler','venta') NOT NULL,
    tipo ENUM('apartamento',"townhouse","quinta","casa","galpon","oficina","fcomercio","otros"),
    niveles varchar(1) NOT NULL,
    tamano_terreno VARCHAR(1) NOT NULL,
    tamanoconst VARCHAR(1) NOT NULL,
    hab VARCHAR(1) NOT NULL,
    bano VARCHAR(1) NOT NULL,
    mediobano VARCHAR(1) NOT NULL,
    servicio VARCHAR(1) NOT NULL,
    maletero VARCHAR(1) NOT NULL,
    terraza VARCHAR(1) NOT NULL,
    oficina ENUM('Si','No') NOT NULL,
    pe VARCHAR(1) NOT NULL,
    escaleras ENUM("no-tiene","granito","marmol","madera","concreto","baranda","calentador") NOT NULL,
    piso ENUM("madera","porcelanato","granito","ceramica","cemento","caico") NOT NULL,
    observaciones VARCHAR(250) NOT NULL,
    referido VARCHAR(50) NOT NULL,
    timestamp VARCHAR(25) NOT NULL,
    propiedad VARCHAR(250) NOT NULL,
    liberacion VARCHAR(250) NOT NULL,
    catastral VARCHAR(250) NOT NULL,
    solvencia VARCHAR(250) NOT NULL,
    registro VARCHAR(250) NOT NULL,
    poder VARCHAR(250) NOT NULL,
    captacion VARCHAR(250) NOT NULL,
    PRIMARY KEY(idPropiedad)
)


INSERT INTO Usuario(Usuario,Contraseña,TipoUsuario)
VALUES('admin','admin','Administrador'),
('asesor','asesor','Asesor')

CREATE USER 'WebPage'@'%' IDENTIFIED BY 'Stalin25-10'

GRANT SELECT ON Usuario TO 'WebPage'@'%'
