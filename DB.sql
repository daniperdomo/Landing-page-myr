-- Active: 1717970931403@@127.0.0.1@3306@inmobiliaria
CREATE DATABASE Inmobiliaria


CREATE USER 'WebPage'@'%' IDENTIFIED BY 'Stalin25-10'

GRANT SELECT ON Usuario TO 'WebPage'@'%'


USE Inmobiliaria

CREATE TABLE Propiedad(
    IdPropiedad INT PRIMARY KEY AUTO_INCREMENT,
    NombreContacto VARCHAR(15) NOT NULL,
    Teleforno VARCHAR(10) NOT NULL,
    TipoPropiedad VARCHAR(50) NOT NULL,
    Ubicacion VARCHAR(100) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Descripcion TEXT,
    TamañoConstruc INT NOT NULL,
    TamañoTerreno INTEGER NOT NULL,
    Habitaciones INTEGER NOT NULL,
    Baños INTEGER NOT NULL,
    Estacionamiento INTEGER NOT NULL
)


CREATE TABLE Cocina_Servicio(
    IdPropiedad INT AUTO_INCREMENT,
    Cocina_Servicio ENUM('Vitroceramica','Electrica','Gas','Encimera','Mamposteria','Horno','Microondas','Salpicadero','Filtro de agua','Campana','Frezzer','Nevera','Lavadora','Secadora'),
    FOREIGN KEY(IdPropiedad) REFERENCES Propiedad(IdPropiedad),
    PRIMARY KEY (IdPropiedad,Cocina_Servicio)
)

CREATE TABLE Sala_Comedor(
    IdPropiedad INT AUTO_INCREMENT ,
    Sala_Comedor ENUM('Mesa','Sillas','A/A','Televisor','Mesa noche','Poltrona','BibliOteca','Ceibo','H. Theater','Lamparas'),
    FOREIGN KEY(IdPropiedad) REFERENCES Propiedad(IdPropiedad),
    PRIMARY KEY (IdPropiedad,Sala_Comedor)
)

CREATE TABLE DormitorioPri(
    IdPropiedad INT AUTO_INCREMENT,
    DormitorioPrin ENUM('Camas','Colchon','Peinadora','Vestier','A/A','Televisor','Mesa Nocje','Poltrona','Directv','Closet','Lamparas','Espejo','Perchero'),
    FOREIGN KEY(IdPropiedad) REFERENCES Propiedad(IdPropiedad),
    PRIMARY KEY (IdPropiedad,DormitorioPrin)
)

CREATE TABLE CuartoII(
    IdPropiedad INT AUTO_INCREMENT,
    CuartoII ENUM('Camas','Literas','Colchon','Mesa','Lamparas','Ceibo','Peinadora','Vestier','Closeth','Tv-Cable','Poltrona','A/A','Espejo'),
    FOREIGN KEY(IdPropiedad) REFERENCES Propiedad(IdPropiedad),
    PRIMARY KEY (IdPropiedad,CuartoII)
)

CREATE TABLE CuartoIII(
    IdPropiedad INT AUTO_INCREMENT,
    CuartoIII ENUM('Camas','Literas','Colchon','Mesa','Lamparas','Ceibo','Peinadora','Vestier','Closeth','Tv-Cable','Poltrona','A/A','Espejo'),
    FOREIGN KEY(IdPropiedad) REFERENCES Propiedad(IdPropiedad),
    PRIMARY KEY (IdPropiedad,CuartoIII)
)

CREATE TABLE Escalera(
    IdPropiedad INT AUTO_INCREMENT,
    Escalera ENUM('Granito','Marmol','Madera','Concreto','Baranda','Calentador'),
    FOREIGN KEY(IdPropiedad) REFERENCES Propiedad(IdPropiedad),
    PRIMARY KEY (IdPropiedad,Escalera)
)

CREATE TABLE Piso(
    IdPropiedad INT AUTO_INCREMENT,
    Piso ENUM('Madera','Porcelanato','Granito','Ceramica','Cemento','Caico'),
    FOREIGN KEY(IdPropiedad) REFERENCES Propiedad(IdPropiedad),
    PRIMARY KEY (IdPropiedad,Piso)
)

CREATE TABLE Area_Externa(
    IdPropiedad INT AUTO_INCREMENT,
    Area_Externa ENUM('Patio','Piscina','Parrillera','Jardinera','Gimnasio','Fuente','Tanque de agua','Lavandero','Reflector'),
    FOREIGN KEY(IdPropiedad) REFERENCES Propiedad(IdPropiedad),
    PRIMARY KEY (IdPropiedad,Area_Externa)
)

CREATE TABLE Seguridad(
    IdPropiedad INT AUTO_INCREMENT,
    Seguridad ENUM('Camara','DVD','Alarma','Vigilancia','Cerca Elect','Monitor','B. Panico','Sirena'),
    FOREIGN KEY(IdPropiedad) REFERENCES Propiedad(IdPropiedad),
    PRIMARY KEY (IdPropiedad,Seguridad)
)

CREATE TABLE Usuario(
    IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Usuario VARCHAR(50) NOT NULL,
    Contraseña VARCHAR(50) NOT NULL
)


INSERT INTO Usuario(Usuario,Contraseña)
VALUES('admin','admin')
