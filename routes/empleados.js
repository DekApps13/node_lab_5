const express = require("express")
const router = express.Router()
var {empleados} = require("../models/empleados")
const valida_empleado = require("../middleware/valida_empleado")

router.get("/", (req, res)=>{
    return res.status(200).json(empleados)
})

router.get("/:id", (req, res)=>{
    const id = req.params.id
    const filtro = empleados.filter((emp)=> emp.id == id)
    if (filtro.length>0)
        return res.status(200).json(filtro)
    else
        return res.status(404).json({status:"No se encontro el empleado"})
})

router.post("/", valida_empleado.post, (req, res)=>{
    var elemento = req.body
    elemento.id = empleados.length+1
    empleados.push(elemento)
    return res.status(201).json(elemento)
})

router.put("/:id", valida_empleado.put, (req, res)=>{
    const id = req.params.id
    var elemento = req.body
    const filtro = empleados.filter((emp)=> emp.id == id)
    if (filtro.length>0){
        empleados = empleados.filter((emp)=> emp.id != id)
        elemento.id = id
        empleados.push(elemento)
        return res.status(201).json(elemento)
    }else
        return res.status(404).json({status:"No se encontro el empleado"})
})

router.delete("/:id", (req, res)=>{
    const id = req.params.id
    const filtro = empleados.filter((emp)=> emp.id == id)
    if (filtro.length>0){
        empleados = empleados.filter((emp)=> emp.id != id)
        return res.status(200).json(filtro)
    }else
        return res.status(404).json({status:"No se encontro el empleado"})
})

module.exports = router