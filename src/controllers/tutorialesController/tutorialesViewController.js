import tutorialesController from "./tutorialesController.js";
import temasModel from "../../models/temasModel.js";


 const getAll = async (req,res) =>{
    const tutoriales = await tutorialesController.getAll();
    /* res.json(tutoriales); */
    res.render("tutoriales/list",{tutoriales})
}

const misTutoriales = async (req,res)=>{
    const misTutoriales= await tutorialesController.getMisTutos(req,res);
    res.json(misTutoriales);
}

const createForm = async (req,res)=>{
    try {
        const temas = await temasModel.findTemas();
        console.log(temas)
        res.render('tutoriales/new', { temas });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
    console.log("ESTOS SON LOS TEMAS: ",await temasModel.findTemas())
}

const create = async(req,res) =>{
    const idAutor = req.session.user.id;
    const {nombre,descripcion,repositorio,tema} = req.body;
    const idTema=tema
    const [error,tutorial] = await tutorialesController.create(nombre,descripcion,repositorio,idTema,idAutor);
    console.log("Nombre:",nombre,"descripcion:",descripcion,"repositorio:",repositorio,"idTema:",idTema,"idAutor:",idAutor)
    if(error){
        const uriError = encodeURIComponent(error);
        return res.redirect(`/tutoriales/new?error=${uriError}`)
    }
    res.redirect("/tutoriales/misTutos");
}


export default{
    getAll,
    misTutoriales,
    createForm,
    create
}
