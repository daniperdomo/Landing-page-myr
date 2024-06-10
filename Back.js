import express from "express"
import bodyParser from "body-parser"
import path, { dirname } from "path"
import mssql from "mssql"
import { fileURLToPath } from "url"

//puerto del servidor
const port = 3000

//directorio actual
const __dirname = dirname(fileURLToPath(import.meta.url))

//creacion de conexion
async  function acceso(username,contraseña,res){
    try {
        await mssql.connect('Server=localhost,1434;Database=Inmobiliaria;User Id=WebPage;Password=Stalin25-10;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')
        const result = await(mssql.query`select * from Usuario`)
        for (let i = 0; i < result.recordsets.length; i++) {
            if(username == result.recordset[i].Usuario && contraseña == result.recordset[i].Contraseña){
                res.sendFile(path.join(__dirname,'administrador.html'))
            }else{
                res.send('No Acceso')
            }
        }
    } catch(err){
        console.log(err)
    }
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
    console.log(req)
    acceso(usuario,contraseña,res)
})
