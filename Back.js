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

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

wss.on('connection', (ws) =>{
    let query = 'SELECT * FROM propiedadesweb'
    BD.query(query,(err,result) =>{
        if (err) throw result
        ws.send(JSON.stringify(result));
    })
})

const upload = multer({ storage });
//puerto del servidor
const port = 3000

//directorio actual
const __dirname = dirname(fileURLToPath(import.meta.url))

// Crear la carpeta 'uploads' si no existe
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// creacion de conexion
async  function acceso(username,contraseña,res){
    let query = 'Select * from Usuario'
    
    BD.query(query, (err,result) =>{
        if (err) throw res
        for(let i=0; i<result.length;i++){
            if(result[i].Usuario == username && result[i].Contraseña == contraseña && result[i].TipoUsuario == 'Administrador'){
                res.sendFile(path.join(__dirname, 'administrador.html'))
                return
            }
            if(result[i].Usuario == username && result[i].Contraseña == contraseña && result[i].TipoUsuario == 'Asesor'){
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
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname)))

//inicia el servidor
app.listen(port,()=>{
    console.log(`Servidor iniciado en el puerto ${port}`)
})

//Pagina principal
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

//Pagina de inicio de sesion
app.get("/iniciarsesion.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'iniciarsesion.html'))
})

//Prueba de login
app.post('/login',(req,res) =>{
    var usuario = req.body.username
    var contraseña = req.body.password
    acceso(usuario,contraseña,res)
})

//Pagina de captacion inmueble
app.get("/captacion.html", (req, res) => {
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
    { name: 'files', maxCount: 10 } // Para las imágenes de captación de inmuebles
]);

// Ruta unificada para manejar la carga de archivos y datos de ambos formularios
app.post('/submit-cliente', uploadFields, (req, res) => {
    try {
        console.log(req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se han subido archivos.');
        }

        // Procesar los datos del formulario
        const data = req.body;
        const timestamp = req.body.timestamp; // Obtener la marca de tiempo del formulario
        console.log('Datos del formulario:', data);
        console.log('Archivos subidos:', req.files);
        console.log('Marca de tiempo:', timestamp);

        // Guardar los datos en la base de datos 
        // ...

        res.send('Archivos y datos del formulario subidos con éxito.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir los archivos y datos del formulario.');
    }
});