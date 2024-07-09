import express from "express"
import bodyParser from "body-parser"
import path, { dirname } from "path"
import mysql from "mysql2"
import { fileURLToPath } from "url"
import multer from "multer";
import { WebSocketServer } from "ws"
import fs from 'fs';

//Coneccion con Base de datos MySql
var BD = mysql.createConnection({
    host: "localhost",
    user: "WebPage",
    password: "Stalin25-10",
    database: 'Inmobiliaria'
})
//Creacion del Socket del lado del servidor en el puerto 8080
const wss = new WebSocketServer({ port: 8080 });

// Función para determinar el directorio de destino
const determineDestination = (req, file, cb) => {
    if (file.fieldname === 'images' || file.mimetype.startsWith('image')) {
        cb(null, 'uploads/images');
    } else {
        cb(null, 'uploads');
    }
};

// Configuración de Multer para manejar la subida de archivos con directorios personalizados
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        determineDestination(req, file, cb);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

wss.on('connection', (ws) => {

    ws.on('message', (message) => {
        let data = JSON.parse(message)
        console.log(data[0])
        if (data[0] == 'propiedades') {
            let query = 'SELECT * FROM PropiedadesWeb'
            BD.query(query, (err, result) => {
                if (err) throw result
                ws.send(JSON.stringify(result));
            })
        }
        if (data[0] == 'historico') {
            let query = 'SELECT * FROM historico'
            BD.query(query, (err, result) => {
                if (err) throw result
                ws.send(JSON.stringify(['historico',result]));
            })
        }

        if (data[0] == 'detalle'){
            let ref = data[1]
            let query = `SELECT idPropiedad FROM Propiedad WHERE ref_catastral='${ref}'`
            BD.query(query, (err, result) => {
                let id = result[0].idPropiedad
                query = `SELECT * FROM Propiedad WHERE idPropiedad='${id}'`
                BD.query(query,(err,result) => {
                    let datos = result
                    query = `SELECT * FROM Cocina WHERE idPropiedad='${id}'`
                    BD.query(query,(err,result) => {
                        datos.push(result[0])
                        query = `SELECT * FROM Sala WHERE idPropiedad='${id}'`
                        BD.query(query,(err,result)=>{
                            datos.push(result[0])
                            query = `SELECT * FROM AreaExterna WHERE idPropiedad='${id}'`
                            BD.query(query, (err,result) =>{
                                datos.push(result[0])
                                query = `SELECT * FROM Seguridad WHERE idPropiedad = '${id}'`
                                BD.query(query, (err,result) =>{
                                    datos.push(result[0])
                                    datos.unshift(['detalle'])
                                    ws.send(JSON.stringify(datos))
                                })
                            })
                        })
                    })
                })
            })
        }
        if(data[0] == 'carga'){
            let ref = data[1]
            let query = `UPDATE Propiedad SET cargado=1 WHERE ref_catastral='${ref}'`
            BD.query(query, (err,result) =>{
                
            })
        }

    })
})
const upload = multer({ storage });
//puerto del servidor
const port = 3000

//directorio actual
const __dirname = dirname(fileURLToPath(import.meta.url))

// Crear las carpetas 'uploads' y 'uploads/images' si no existen
const createUploadsDirectories = () => {
    const uploadPaths = ['uploads', 'uploads/images'];
    uploadPaths.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};
createUploadsDirectories();

// creacion de conexion
async function acceso(username, contraseña, res) {
    let query = 'Select * from Usuario'

    BD.query(query, (err, result) => {
        if (err) throw res
        for (let i = 0; i < result.length; i++) {
            if (result[i].Usuario == username && result[i].Contraseña == contraseña && result[i].TipoUsuario == 'Administrador') {
                res.sendFile(path.join(__dirname, 'administrador.html'))
                return
            }
            if (result[i].Usuario == username && result[i].Contraseña == contraseña && result[i].TipoUsuario == 'Asesor') {
                res.sendFile(path.join(__dirname, 'asesor.html'))
                return
            }
        }
        res.status(401).sendFile(path.join(__dirname, 'iniciarsesion.html'))

    })
}

//Configuracion del servidor
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname)))

//inicia el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
})

//Pagina principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

//Pagina de inicio de sesion
app.get("/iniciarsesion.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'iniciarsesion.html'))
})

//Prueba de login
app.post('/login', (req, res) => {
    var usuario = req.body.username
    var contraseña = req.body.password
    acceso(usuario, contraseña, res)
})

//Detalle de propiedad
app.get('/detalle-propiedad.html', (req, res) => {
    res.sendFile(path.join(__dirname, "detalle-propiedad.html"));
})

//Pagina de captacion inmueble
app.get("/captacion.html", (req, res) => {
    console.log(req.body)
    res.sendFile(path.join(__dirname, "captacion.html"));
});


// Configurar Multer para aceptar todos los posibles campos de archivos de ambos formularios
const uploadFields = upload.fields([
    { name: 'propiedad', maxCount: 1 }, // Para el formulario de captación de clientes
    { name: 'liberacion', maxCount: 1 },
    { name: 'catastral', maxCount: 1 },
    { name: 'solvencia', maxCount: 1 },
    { name: 'registro', maxCount: 1 },
    { name: 'poder', maxCount: 1 },
    { name: 'captacion', maxCount: 1 },
    { name: 'images', maxCount: 10 } // Para las imágenes de captación de inmuebles

]);

// Ruta unificada para manejar la carga de archivos y datos de ambos formularios
app.post('/submit-cliente', uploadFields, (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se han subido archivos.');
        }

        // Procesar los datos del formulario
        const data = JSON.parse(JSON.stringify(req.body));
        const timestamp = req.body.timestamp; // Obtener la marca de tiempo del formulario
        var id
        // Guardar los datos en la base de datos
        let query = `INSERT INTO Propiedad(ref_catastral,tipo_id,cedula,rif,asiento,n_protocolo,f_real,phone,sector,residentialcomplex,contactname,precio,tipo_oferta,tipo,niveles,tamano_terreno,tamanoconst,hab,bano,mediobano,servicio,maletero,terraza,oficina,pe,escaleras,piso,observaciones,referido,timestamp,propiedad,liberacion,catastral,solvencia,registro,poder,captacion) VALUES('${data.ref_catastral}','${data.tipo_id}','${data.cedula}','${data.rif}','${data.asiento}','${data.n_protocolo}','${data.f_real}','${data.phone}','${data.sector}','${data.residentialcomplex}','${data.contactname}','${data.precio}','${data.tipo_oferta}','${data.tipo}','${data.niveles}','${data.tamano_terreno}','${data.tamanoconst}','${data.hab}','${data.bano}','${data.mediobano}','${data.servicio}','${data.maletero}','${data.terraza}','${data.oficina}','${data.pe}','${data.escaleras}','${data.piso}','${data.observaciones}','${data.referido}','${data.timestamp}','${req.files.propiedad[0].path.replace("\\", "\\\\")}','${req.files.liberacion[0].path.replace("\\", "\\\\")}','${req.files.catastral[0].path.replace("\\", "\\\\")}','${req.files.solvencia[0].path.replace("\\", "\\\\")}','${req.files.registro[0].path.replace("\\", "\\\\")}','${req.files.poder[0].path.replace("\\", "\\\\")}','${req.files.captacion[0].path.replace("\\", "\\\\")}')`
        //Carga de informacion de cliente e informacion general de inmueble
        BD.query(query, (err, result) => {
            console.log('Cargado con exito')
            BD.query(`SELECT idPropiedad FROM Propiedad WHERE ref_catastral= '${data.ref_catastral}'`, (err, result) => {
                id = (result[0].idPropiedad)
                console.log(id)

                //Cocina
                query = 'INSERT INTO cocina(idPropiedad'
                let Values = `Values(${id}`
                if (data.hasOwnProperty('vitroceramica')) {
                    query = query.concat(',vitroceramica')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('electrica')) {
                    query = query.concat(',electrica')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('gas')) {
                    query = query.concat(',gas')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('encimera')) {
                    query = query.concat(',encimera')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('mamposteria')) {
                    query = query.concat(',mamposteria')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('horno')) {
                    query = query.concat(',horno')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('microondas')) {
                    query = query.concat(',microondas')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('salpicadero')) {
                    query = query.concat(',salpicadero')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('filtro_agua')) {
                    query = query.concat(',filtro_agua')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('campana')) {
                    query = query.concat(',campana')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('freezer')) {
                    query = query.concat(',freezer')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('nevera')) {
                    query = query.concat(',nevera')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('lavadora')) {
                    query = query.concat(',lavadora')
                    Values = Values.concat(',true')
                }
                if (data.hasOwnProperty('secadora')) {
                    query = query.concat(',secadora')
                    Values = Values.concat(',true')
                }
                query = query.concat(')')
                Values = Values.concat(')')
                query = query.concat(' ', Values)
                BD.query(query, (err, result) => {


                    //Sala
                    query = 'INSERT INTO Sala(idPropiedad'
                    Values = `Values(${id}`
                    if (data.hasOwnProperty('mesa_sala')) {
                        query = query.concat(',mesa_sala')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('sillas')) {
                        query = query.concat(',sillas')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('aire_sala')) {
                        query = query.concat(',aire_sala')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('vitrina_sala')) {
                        query = query.concat(',vitrina_sala')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('cantv_sala')) {
                        query = query.concat(',cantv_sala')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('internet_sala')) {
                        query = query.concat(',internet_sala')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('tv_sala')) {
                        query = query.concat(',tv_sala')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('directv_sala')) {
                        query = query.concat(',directv_sala')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('sofa_sala')) {
                        query = query.concat(',sofa_sala')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('poltrona_sala')) {
                        query = query.concat(',poltrona_sala')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('biblioteca_sala')) {
                        query = query.concat(',biblioteca_sala')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('ceibo_sala')) {
                        query = query.concat(',ceibo_sala')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('htheater_sala')) {
                        query = query.concat(',htheater_sala')
                        Values = Values.concat(',true')
                    }
                    if (data.hasOwnProperty('lamparas_sala')) {
                        query = query.concat(',lamparas_sala')
                        Values = Values.concat(',true')
                    }
                    query = query.concat(')')
                    Values = Values.concat(')')
                    query = query.concat(' ', Values)
                    BD.query(query, (err, result) => {



                        //Area externa
                        query = 'INSERT INTO AreaExterna(idPropiedad'
                        Values = `Values(${id}`
                        if (data.hasOwnProperty('patio_externa')) {
                            query = query.concat(',patio_externa')
                            Values = Values.concat(',true')
                        }
                        if (data.hasOwnProperty('piscina_externa')) {
                            query = query.concat(',piscina_externa')
                            Values = Values.concat(',true')
                        }
                        if (data.hasOwnProperty('parrillera_externa')) {
                            query = query.concat(',parrillera_externa')
                            Values = Values.concat(',true')
                        }
                        if (data.hasOwnProperty('jardinera_externa')) {
                            query = query.concat(',jardinera_externa')
                            Values = Values.concat(',true')
                        }
                        if (data.hasOwnProperty('gimnasio_externa')) {
                            query = query.concat(',gimnasio_externa')
                            Values = Values.concat(',true')
                        }
                        if (data.hasOwnProperty('fuente_externa')) {
                            query = query.concat(',fuente_externa')
                            Values = Values.concat(',true')
                        }
                        if (data.hasOwnProperty('tanque_agua_externa')) {
                            query = query.concat(',tanque_agua_externa')
                            Values = Values.concat(',true')
                        }
                        if (data.hasOwnProperty('lavandero_externa')) {
                            query = query.concat(',lavandero_externa')
                            Values = Values.concat(',true')
                        }
                        if (data.hasOwnProperty('reflector_externa')) {
                            query = query.concat(',reflector_externa')
                            Values = Values.concat(',true')
                        }
                        query = query.concat(')')
                        Values = Values.concat(')')
                        query = query.concat(' ', Values)
                        BD.query(query, (err, result) => {


                            //Seguridad
                            query = 'INSERT INTO Seguridad(idPropiedad'
                            Values = `Values(${id}`
                            if (data.hasOwnProperty('camara')) {
                                query = query.concat(',camara')
                                Values = Values.concat(',true')
                            }
                            if (data.hasOwnProperty('dvr')) {
                                query = query.concat(',dvr')
                                Values = Values.concat(',true')
                            }
                            if (data.hasOwnProperty('alarma')) {
                                query = query.concat(',alarma')
                                Values = Values.concat(',true')
                            }
                            if (data.hasOwnProperty('vigilancia')) {
                                query = query.concat(',vigilancia')
                                Values = Values.concat(',true')
                            }
                            if (data.hasOwnProperty('cerca_electrica')) {
                                query = query.concat(',cerca_electrica')
                                Values = Values.concat(',true')
                            }
                            if (data.hasOwnProperty('monitor')) {
                                query = query.concat(',monitor')
                                Values = Values.concat(',true')
                            }
                            if (data.hasOwnProperty('boton-panico')) {
                                query = query.concat(',boton-panico')
                                Values = Values.concat(',true')
                            }
                            if (data.hasOwnProperty('sirena')) {
                                query = query.concat(',sirena')
                                Values = Values.concat(',true')
                            }
                            query = query.concat(')')
                            Values = Values.concat(')')
                            query = query.concat(' ', Values)

                            BD.query(query, (err, result) => {
                                for (let i = 1; i <= data.hab; i++) {
                                    query = 'INSERT INTO Cuartos(idPropiedad,cuarto'
                                    Values = `Values(${id},'cuarto${i}'`
                                    if (data.hasOwnProperty(`cama_cu${i}`)) {
                                        query = query.concat(`,cama_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`colchon_cu${i}`)) {
                                        query = query.concat(`,colchon_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`peinadora_cu${i}`)) {
                                        query = query.concat(`,peinadora_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`vestier_cu${i}`)) {
                                        query = query.concat(`,vestier_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`aire_cu${i}`)) {
                                        query = query.concat(`,aire_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`aire_cu${i}`)) {
                                        query = query.concat(`,aire_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`tv_cu${i}`)) {
                                        query = query.concat(`,tv_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`mesa_noche_cu${i}`)) {
                                        query = query.concat(`,mesa_noche_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`poltrona_cu${i}`)) {
                                        query = query.concat(`,poltrona_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`directv_cu${i}`)) {
                                        query = query.concat(`,directv_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`closet_cu${i}`)) {
                                        query = query.concat(`,closet_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`lamparas_cu${i}`)) {
                                        query = query.concat(`,lamparas_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`espejo_cu${i}`)) {
                                        query = query.concat(`,espejo_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    if (data.hasOwnProperty(`perchero_cu${i}`)) {
                                        query = query.concat(`,perchero_cu`)
                                        Values = Values.concat(`,true`)
                                    }
                                    query = query.concat(')')
                                    Values = Values.concat(')')
                                    query = query.concat(' ', Values)
                                    BD.query(query, (err, result) => {
                                    })
                                }
                            })
                        })
                    })
                })
            })
            if (err) {
                console.log(err.message)
            } else {
                console.log('Datos cargados sin problemas')
            }
        })
        // ...

        res.sendFile(path.join(__dirname, "exito-captacion.html"));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir los archivos y datos del formulario.');
    }
});

// Configurar Multer para aceptar los campos de archivos del formulario de oferta y consulta
const uploadOfertaConsulta = upload.fields([
    { name: 'archivo_oferta', maxCount: 10 }
]);

app.post('/submit-oferta-consulta', uploadOfertaConsulta, (req, res) => {
    try {
        console.log(req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se han subido archivos.');
        }

        // Procesar los datos del formulario
        const data = JSON.parse(JSON.stringify(req.body));
        // Guardar los datos en la base de datos 
        // 
        res.send('Archivos y datos del formulario subidos con éxito.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir los archivos y datos del formulario.');
    }
});

// Nueva ruta para manejar la carga de datos del formulario de reserva
app.post('/submit-reserva', (req, res) => {
    try {
        // Procesar los datos del formulario
        const data = req.body;
        console.log('Datos del formulario de reserva:', data);
        console.log('Marca de tiempo:', timestamp);

        // Guardar los datos en la base de datos 
        // 
        res.send('Datos del formulario de reserva subidos con éxito.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir los datos del formulario de reserva.');
    }
});