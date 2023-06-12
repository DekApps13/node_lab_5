const express = require("express")
const router = express.Router()
var {usuarios} = require("../models/usuarios")
const valida_usuario = require("../middleware/valida_usuario")

router.get("/", (req, res)=>{
    return res.status(200).json(usuarios)
})

router.get("/:id", (req, res)=>{
    const id = req.params.id
    const filtro = usuarios.filter((usr)=> usr.id == id)
    if (filtro.length>0)
        return res.json(filtro)
    else
        return res.status(404).json({status:"Usuario no encontrado"})
})

router.post("/", valida_usuario, (req, res)=>{
    var body = req.body
    //console.log(body)
    body.id = usuarios.length+1
    usuarios.push(body)
    return res.status(201).json(body)
})

router.put("/:id", (req, res)=>{
    var id = req.params.id
    var body = req.body
    const filtro = usuarios.filter((usr)=>usr.id == id)
    if (filtro.length>0){
        usuarios = usuarios.filter((usr)=>usr.id != id)
        body.id = id
        usuarios.push(body)
        return res.status(201).json(body)
    }else
        return res.status(404).json({status:"Usuario no encontrado"})
})

router.delete("/:id", (req, res)=>{
    var id = req.params.id
    const filtro = usuarios.filter((usr)=>usr.id == id)
    if (filtro.length>0){
        usuarios = usuarios.filter((usr)=>usr.id != id)
        return res.status(201).json(filtro)
    }else
        return res.status(404).json({status:"Usuario no encontrado"})
})

module.exports = router