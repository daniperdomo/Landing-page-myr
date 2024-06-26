-- Active: 1717970931403@@127.0.0.1@3306@inmobiliaria
CREATE DATABASE Inmobiliaria


CREATE USER 'WebPage'@'%' IDENTIFIED BY 'Stalin25-10'

GRANT SELECT ON Usuario TO 'WebPage'@'%'

GRANT SELECT ON propiedadesweb TO 'WebPage'@'%'

USE Inmobiliaria

CREATE TABLE Propiedad(
    IdPropiedad INT PRIMARY KEY AUTO_INCREMENT,
    NombreContacto VARCHAR(15) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    TipoPropiedad ENUM('Apartamento','Town House','Quinta','Casa','Galpon','Oficina','F. Comercio','Otros'),
    TipoListado ENUM('Para la Venta','Para Renta'),
    Ubicacion VARCHAR(100) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Dormitorios INT,
    Habitaciones INT,
    Baños INT,
    MedioBaño INT,
    Descripcion TEXT,
    TamañoConstruc INT NOT NULL,
    TamañoTerreno INT NOT NULL,
    AñoDeConstruccion INT,
    Estacionamiento INTEGER NOT NULL,
    Country VARCHAR(30),
    Ciudad VARCHAR(30),
    CodigoPostal VARCHAR(10),
    NumeroDePiso INT,
    Longitud VARCHAR(20),
    Latitud VARCHAR(20)
)

INSERT INTO propiedad(NombreContacto,Telefono,TipoPropiedad,TipoListado,Ubicacion,Precio,Dormitorios,Habitaciones,Baños,MedioBaño,Descripcion,TamañoConstruc,TamañoTerreno,AñoDeConstruccion,Estacionamiento,Country,Ciudad,CodigoPostal,NumeroDePiso,Longitud,Latitud)
VALUES ('Stalin','04249159738','Apartamento','Para la Venta','Calle 12 # 34-56',5000000,3,2,2,1,'Apartamento en el centro de la ciudad',120,200,2010,2,'Colombia','Medellín',050001,5,'-74.8081','-4.5703')



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
    Contraseña VARCHAR(50) NOT NULL,
    TipoUsuario ENUM('Administrador','Asesor') NOT NULL
)


INSERT INTO Usuario(Usuario,Contraseña,TipoUsuario)
VALUES('admin','admin','Administrador'),
('asesor','asesor','Asesor')



CREATE VIEW PropiedadesWeb AS
SELECT TipoPropiedad,TipoListado,Precio,Dormitorios,Habitaciones,Baños,MedioBaño,TamañoConstruc,AñoDeConstruccion,Country,Ciudad,CodigoPostal,NumeroDePiso,Longitud,Latitud

FROM propiedad
