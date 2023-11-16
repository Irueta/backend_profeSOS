import tutorialesController from "./tutorialesController.js";
import temasModel from "../../models/temasModel.js";
import tutorialesModel from "../../models/tutorialesModel.js";


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
    const {nombre,descripcion,repositorio,tema,nuevoTema} = req.body;
    console.log("TUTORIAL",req.body)
    try{
        if(nuevoTema!=="")
        {
            const oldTema = await temasModel.findIdTemaByName(nuevoTema);
            console.log("ESTE ES EL TEMA VIEJO",oldTema)
            if(oldTema.length!==0){
                throw new Error("Ese tema ya existe");
            }
            const newTema = await temasModel.create(nuevoTema)
            const idTema=newTema
            console.log("ESTE ES EL IDTEMA DEL NUEVO TEMA",idTema)
            const tutorial = await tutorialesController.create(nombre,descripcion,repositorio,idTema,idAutor);
            return res.redirect("/tutoriales/misTutos");
        }else{
            const idTema=tema
                const [error,tutorial] = await tutorialesController.create(nombre,descripcion,repositorio,idTema,idAutor);
                console.log("Nombre:",nombre,"descripcion:",descripcion,"repositorio:",repositorio,"idTema:",idTema,"idAutor:",idAutor)
                if(error){
                    const uriError = encodeURIComponent(error);
                    return res.redirect(`/tutoriales/new?error=${uriError}`)
                }
            res.redirect("/tutoriales/misTutos");

        }
    }catch(e){
        console.log(e)
        res.redirect("/tutoriales/new")
    }

    
}

const buscadorForm = async (req,res)=>{
    try {
        const temas = await temasModel.findTemas();
        console.log(temas)
        res.render('tutoriales/buscador', { temas });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
}


const buscadorList = async (req,res)=>{
    const {titulo,tema,descripcion,autor}=req.body;
    console.log(req.body)
    try{
        const busqueda = await tutorialesModel.findAllBuscador(titulo,tema,descripcion,autor)
        console.log("BUSQUEDA",busqueda)
        if(busqueda.length===0){
            const error="Ningún tutorial cumple los requisitos de búsqueda"
            const uriError = encodeURIComponent(error);
            return res.redirect(`/tutoriales/search?error=${uriError}`)
        }else{
            res.json(busqueda);
        }
    }catch(e){
        console.log(e)
    }
}

export default{
    getAll,
    misTutoriales,
    createForm,
    create,
    buscadorForm,
    buscadorList
}
