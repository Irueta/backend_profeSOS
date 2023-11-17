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
    /* res.json(misTutoriales); */
    res.render("tutoriales/misTutos",{req,misTutoriales})
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
}

const create = async(req,res) =>{
    const idAutor = req.session.user.id;
    const {nombre,descripcion,repositorio,tema,nuevoTema} = req.body;
    try{
        if(nuevoTema!=="")
        {
            const oldTema = await temasModel.findIdTemaByName(nuevoTema);
            if(oldTema.length!==0){
                throw new Error("Ese tema ya existe");
            }
            const newTema = await temasModel.create(nuevoTema)
            const idTema=newTema
            console.log("IDTEMA DEL VUEVOTEMA",idTema)
            const tutorial = await tutorialesController.create(nombre,descripcion,repositorio,idTema,idAutor);
            console.log("NUEVO TUTO1:", tutorial)
            return res.redirect("/tutoriales/misTutos");
        }else{
            const idTema=tema
                const [error,tutorial] = await tutorialesController.create(nombre,descripcion,repositorio,idTema,idAutor);
                console.log("NUEVO TUTO2:", tutorial)
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
        const tutoriales=await tutorialesController.getAll()
        console.log(temas,tutoriales)
       /*  res.json({temas, tutoriales}) */
        res.render('tutoriales/buscador', {temas, tutoriales});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
}


const buscadorList = async (req,res)=>{
    const {titulo,tema,descripcion,autor}=req.query;
    try{
        const temas = await temasModel.findTemas();
        const tutoriales = await tutorialesModel.findAllBuscador(titulo,tema,descripcion,autor)
        console.log("BUSQUEDA",tutoriales)
        if(tutoriales.length===0){
            const error="Ningún tutorial cumple los requisitos de búsqueda"
            const uriError = encodeURIComponent(error);
            return res.redirect(`/tutoriales/search?error=${uriError}`)
        }else{
            /* res.json(tutoriales); */
            res.render('tutoriales/buscador', {temas, tutoriales});
        }
    }catch(e){
        console.log(e)
    }
}



const buscarPorId= async(req,res)=>{
    const id=req.params.id
    const tutorial = await tutorialesController.getById(id)
    console.log("AUKERATUTAKU",tutorial)
    res.render("tutoriales/show",tutorial) ;
}


export default{
    getAll,
    misTutoriales,
    createForm,
    create,
    buscadorForm,
    buscadorList,
    buscarPorId
}




/* const buscadorList = async (req,res)=>{
    const {titulo,tema,descripcion,autor}=req.query;
    console.log(req.body)
    try{
        const temas = await temasModel.findTemas();
        const tutoriales = await tutorialesModel.findAllBuscador(titulo,tema,descripcion,autor)
        console.log("BUSQUEDA",tutoriales)
        if(tutoriales.length===0){
            const error="Ningún tutorial cumple los requisitos de búsqueda"
            const uriError = encodeURIComponent(error);
            return res.redirect(`/tutoriales/search?error=${uriError}`)
        }else{
  
            res.render('tutoriales/buscador', {temas, tutoriales});
        }
    }catch(e){
        console.log(e)
    }
} */