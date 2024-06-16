import express from "express"
import bodyParser from "body-parser"
import path, { dirname } from "path"
import mysql from "mysql2"
import { fileURLToPath } from "url"
import multer from "multer";

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
//puerto del servidor
const port = 3000

var BD = mysql.createConnection({
    host: "localhost",
    user: "WebPage",
    password: "Stalin25-10",
    database: 'Inmobiliaria'
})

//directorio actual
const __dirname = dirname(fileURLToPath(import.meta.url))

//creacion de conexion
async  function acceso(username,contraseña,res){
    let query = 'Select * from Usuario'
    BD.query(query, (err,result) =>{
        if (err) throw err

        for(let i=0; i<result.length;i++){
            console.log(result[i].Usuario)
            if(result[i].Usuario == username && result[i].Contraseña == contraseña){
                res.sendFile(path.join(__dirname, 'administrador.html'))
                }
        }
        
    })
}

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname)))

//inicia el servidor
app.listen(port,()=>{
    console.log(`Servidor iniciado en el puerto ${port}`)
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.get("/iniciarsesion.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'iniciarsesion.html'))
})


app.post('/login',(req,res) =>{
    var usuario = req.body.username
    var contraseña = req.body.password
    acceso(usuario,contraseña,res)
})

// Ruta para manejar la carga de archivos
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        console.log(`Archivo subido: ${req.file.filename}`);
        res.send('Archivo subido exitosamente.');
    } else {
        res.status(400).send('Error al subir el archivo.');
    }
});