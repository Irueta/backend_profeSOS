import { Router } from "express";
import tutorialesViewController from "../controllers/tutorialesController/tutorialesViewController.js";
import tutorialesModel from "../models/tutorialesModel.js";
import tutorialesController from "../controllers/tutorialesController/tutorialesController.js";
import votosController from "../controllers/votos/votosController.js";
import votosModel from "../models/votosModel.js";
const router = Router();


router.get("/",(req,res)=>{
    tutorialesViewController.getAll(req,res);
});

router.post("/",(req,res)=>{
    tutorialesModel.findAllBuscador(req,res);
});

router.get("/:id/show",(req,res)=>{
    tutorialesViewController.buscarPorId(req,res);
});

router.post("/:id/show",async (req,res)=>{
    const voto = await votosController.crearVoto(req,res);
});

router.get("/misTutos",(req,res)=>{
    tutorialesViewController.misTutoriales(req,res);
});

router.get("/new",(req,res)=>{
    tutorialesViewController.createForm(req,res);
});

router.post("/new",(req,res)=>{
    tutorialesViewController.create(req,res);
});

router.get("/search",async(req,res)=>{
    return tutorialesViewController.buscadorList(req,res);
    
});


export default router;