import { Router } from "express";
import tutorialesViewController from "../controllers/tutorialesController/tutorialesViewController.js";
import tutorialesModel from "../models/tutorialesModel.js";

const router = Router();


router.get("/",(req,res)=>{
    tutorialesViewController.getAll(req,res);
});

router.post("/",(req,res)=>{
    tutorialesModel.findAllBuscador(req,res);
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


export default router;