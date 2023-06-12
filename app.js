const express = require("express")
const app = express()
const rutaUsuario = require("./routes/usuarios")
const rutaProducto = require("./routes/productos")
const rutaEmpleado = require("./routes/empleados")

//9 Middleware
app.use(express.json())
app.use("/usuarios", rutaUsuario)
app.use("/productos", rutaProducto)
app.use("/empleados", rutaEmpleado)





//6
app.listen(8080, ()=>{
    console.log("Servidor iniciado desde el puerto 8080")
})