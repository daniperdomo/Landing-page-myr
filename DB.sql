-- Active: 1720145332788@@127.0.0.1@3306@inmobiliaria
CREATE DATABASE Inmobiliaria

USE Inmobiliaria

CREATE TABLE Propiedad(
    tipo_id ENUM('V','P','J','E','G','C'),
    ref_catastral VARCHAR(100)NOT NULL UNIQUE,
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
    niveles varchar(10) NOT NULL,
    tamano_terreno VARCHAR(100) NOT NULL,
    tamanoconst VARCHAR(100) NOT NULL,
    hab VARCHAR(10) NOT NULL,
    bano VARCHAR(10) NOT NULL,
    mediobano VARCHAR(10) NOT NULL,
    servicio VARCHAR(10) NOT NULL,
    maletero VARCHAR(10) NOT NULL,
    terraza VARCHAR(10) NOT NULL,
    oficina ENUM('oficina_no','oficina_si') NOT NULL,
    pe VARCHAR(10) NOT NULL,
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

CREATE TABLE Sala(
    idPropiedad INT,
    PRIMARY KEY (idPropiedad),
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad),
    mesa_sala BOOLEAN,
    sillas BOOLEAN,
    aire_sala BOOLEAN,
    vitrina_sala BOOLEAN,
    cantv_sala BOOLEAN,
    internet_sala BOOLEAN,
    tv_sala BOOLEAN,
    directv_sala BOOLEAN,
    sofa_sala BOOLEAN,
    poltrona_sala BOOLEAN,
    biblioteca_sala BOOLEAN,
    ceibo_sala BOOLEAN,
    htheater_sala BOOLEAN,
    lamparas_sala BOOLEAN
)


CREATE TABLE Cocina(
    vitroceramica BOOLEAN,
    electrica BOOLEAN,
    gas BOOLEAN,
    encimera BOOLEAN,
    mamposteria BOOLEAN,
    horno BOOLEAN,
    microondas BOOLEAN,
    salpicadero BOOLEAN,
    filtro_agua BOOLEAN,
    campana BOOLEAN,
    freezer BOOLEAN,
    nevera BOOLEAN,
    lavadora BOOLEAN,
    secadora BOOLEAN,
    idPropiedad INT,
    PRIMARY KEY (idPropiedad),
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad)
)

CREATE TABLE Cuartos(
    idPropiedad INT,
    cuarto varchar(20),
    cama_cu BOOLEAN,
    colchon_cu BOOLEAN,
    peinadora_cu BOOLEAN,
    vestier_cu BOOLEAN,
    aire_cu BOOLEAN,
    tv_cu BOOLEAN,
    mesa_noche_cu BOOLEAN,
    poltrona_cu BOOLEAN,
    directv_cu BOOLEAN,
    closet_cu BOOLEAN,
    lamparas_cu BOOLEAN,
    espejo_cu BOOLEAN,
    perchero_cu BOOLEAN,
    PRIMARY KEY (idPropiedad, cuarto),
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad)
)

CREATE TABLE AreaExterna(
    idPropiedad INT,
    patio_externa BOOLEAN,
    piscina_externa BOOLEAN,
    parrillera_externa BOOLEAN,
    jardinera_externa BOOLEAN,
    gimnasio_externa BOOLEAN,
    fuente_externa BOOLEAN,
    tanque_agua_externa BOOLEAN,
    lavandero_externa BOOLEAN,
    reflector_externa BOOLEAN,
    PRIMARY KEY (idPropiedad),
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad)
)



CREATE TABLE Seguridad(
    idPropiedad INT,
    camara BOOLEAN,
    dvr BOOLEAN,
    alarma BOOLEAN,
    vigilancia BOOLEAN,
    cerca_electrica BOOLEAN,
    monitor BOOLEAN,
    boton_panico BOOLEAN,
    sirena BOOLEAN,
    PRIMARY KEY (idPropiedad),
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad)
)

CREATE TABLE Oferta(
    idOferta INT,
    nombre_apellido_oferta VARCHAR(50) NOT NULL,
    num_tlf_oferta VARCHAR(20) NOT NULL,
    email_oferta VARCHAR(50) NOT NULL,
    ubicacion_oferta VARCHAR(50) NOT NULL,
    razon_venta_oferta VARCHAR(50) NOT NULL,
    niveles_oferta varchar(10) NOT NULL,
    habitaciones_oferta varchar(10) NOT NULL,
    banos_oferta varchar(10) NOT NULL,
    metros_cuadrados_oferta VARCHAR(100) NOT NULL,
    sala_oferta varchar(10) NOT NULL,
    estacionamientos_oferta varchar(10) NOT NULL,
    precio_oferta VARCHAR(25) not NULL,
    tipo_oferta_index ENUM('oferta_venta','oferta_alquiler') NOT NULL,
    
    PRIMARY KEY (idPropiedad),
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad)
)

CREATE TABLE Consulta(
    idConsulta INT,
    nombre_apellido_consulta VARCHAR(50) NOT NULL,
    email_consulta VARCHAR(50) NOT NULL,
    telefono_consulta VARCHAR(20) NOT NULL,
    tema_consulta ENUM('compra_consulta','venta_consulta', 'alquiler_consulta', 'otro_consulta') NOT NULL,
    comentarios_consulta VARCHAR(250) NOT NULL,
    
    PRIMARY KEY (idPropiedad),
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad)
)

CREATE TABLE Oferta(
    tipo_id_reserva ENUM('V','P','J','E','G','C'),
    cedula_reserva VARCHAR(20) not NULL,
    rif_reserva VARCHAR(20) NOT NULL,
    num_tlf_reserva VARCHAR(20) NOT NULL,
    email_reserva VARCHAR(50) NOT NULL,
    precio_ofertado_reserva VARCHAR(25) not NULL,
    nombre_apellido_reserva VARCHAR(50) NOT NULL,
    firmante_reserva VARCHAR(50) NOT NULL,
    tiempo_operacion_reserva
    metodo_pago_reserva ENUM('cheque','transf_exterior', 'transf_interior', 'efectivo', 'metodopago_otro') NOT NULL,
    origen_fondos_reserva ENUM('ingresos_salariales',"ingresos_negocios","prestamos","venta_activos","herencia","origen_otro") NOT NULL,
    
    PRIMARY KEY(idPropiedad)
)

CREATE TABLE Usuario(
    IdUsuario INT AUTO_INCREMENT PRIMARY KEY,
    Usuario VARCHAR(50) NOT NULL,
    Contraseña VARCHAR(50) NOT NULL,
    TipoUsuario ENUM('Administrador','Asesor')
)

INSERT INTO Usuario(Usuario,Contraseña,TipoUsuario)
VALUES('admin','admin','Administrador'),
('asesor','asesor','Asesor')

CREATE USER 'WebPage'@'%' IDENTIFIED BY 'Stalin25-10'

GRANT SELECT ON Usuario TO 'WebPage'@'%'

GRANT SELECT,INSERT ON Propiedad TO 'WebPage'@'%'

GRANT INSERT,SELECT ON Cocina TO 'WebPage'@'%'

GRANT INSERT,SELECT ON Sala TO 'WebPage'@'%'

GRANT INSERT,SELECT ON seguridad TO 'WebPage'@'%'

GRANT INSERT,SELECT ON areaexterna TO 'WebPage'@'%'

GRANT INSERT,SELECT ON Cocina TO 'WebPage'@'%'

GRANT INSERT,SELECT ON cuartos TO 'WebPage'@'%'


CREATE VIEW PropiedadesWeb AS
SELECT hab,precio,bano,sector,residentialcomplex,tipo_oferta,tipo,pe,tamano_terreno
FROM propiedad


CREATE VIEW historico AS
SELECT contactname,sector,residentialcomplex,ref_catastral
FROM propiedad

GRANT SELECT ON PropiedadesWeb TO 'WebPage'@'%'

GRANT SELECT ON historico to 'WebPage'@'%'