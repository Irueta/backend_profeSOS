import { Router } from "express";
import usersViewController from "../controllers/usersController/usersViewController.js";


const router = Router();


router.get("/",(req,res)=>{
    usersViewController.getAll(req,res);
});

router.get("/new",usersViewController.createForm);

router.get("/:id",(req,res)=>{
    usersViewController.getById(req,res);
});


router.post("/",(req,res)=>{
    usersViewController.create(req,res);
});

router.get("/:id/edit", (req,res)=>{
    usersViewController.myUpdateForm(req,res); 
});

router.get("/:id/edit", (req,res)=>{
    usersViewController.update(req,res); 
});

router.post("/:id",(req,res)=>{
    usersViewController.update(req,res);
});

router.get("/:id/delete",(req,res)=>{
    usersViewController.remove(req,res);
});


export default router;



