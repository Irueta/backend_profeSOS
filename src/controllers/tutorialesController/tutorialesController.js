import tutorialesModel from "../../models/tutorialesModel.js";
import session from "express-session";

const getAll = async() => {
    try{
        const tutoriales = await tutorialesModel.findAll();
        return tutoriales;
    }catch(e){
        return e.message
    }
}

const getMisTutos = async(req,res)=>{
        try{
            const autor = req.session.user.id
            const misTutos= await tutorialesModel.findByAutor(autor)
            if(misTutos == undefined){
                res.json("Todavia no has creado ningún tutorial")
            }
            return misTutos
        } catch(e){
            return [e.message,null];
        } 
    }

const getByBuscador = async(req,res)=>{
    try{
        const resultado=await tutorialesModel.getByBuscador()
        return resultado;
    }catch(e){
        return [e.message,null];
    }
}

const getFavoritos = async(req,res)=>{
    const usuario=req.session.user.id;
    try{
        const favoritos = await tutorialesModel.findByLiked(usuario)
    }catch(e){
        console.log(e)
    }
}

const getById = async (id) => {
    try {
        const tutorial = await tutorialesModel.findByPk(id);
        console.log("AUKERATUTAKUN BILE",tutorial)
        return tutorial;
    }
    catch (e) {
        return [e.message, null];
    }
}

const create = async (nombre,descripcion,repositorio,idTema,idAutor) => {
    if (nombre === undefined || descripcion === undefined || repositorio === undefined || idTema === undefined || idAutor === undefined) {
        const error = "Todos los valores deben ser definidos";
        return [error, null];
    }
    try {
        const tutorial = await tutorialesModel.create({nombre,descripcion,repositorio,idTema,idAutor});
        return [null, tutorial];
    }
    catch (e) {
        return [e.message, null];
    }
}

const update = async(req,res) => {
        const {nombre,descripcion,repositorio,idTema,idAutor} = req.body;
    
        try{
            const user= await tutorialesModel.findByPk(id);
            if(nombre===!undefined){
            user.nombre=nombre;
            }
            if (apellido ===!undefined) {
                user.apellido=apellido;
            }
            if (password===!undefined){
                const hash = await bcrypt.hash(password,10);
                user.password=hash
        }
        user.save();
        return [null,user];
    }
    catch (e) {
        console.log(e)
        return [e.message,null];
    }
};

const remove = async (id) => {
    try {
        const user = await tutorialesModel.findByPk(id);
        if(!user){
            const error = "No se ha encontrado ningún elemento con ese ID";
            return[error,null];
        }
        user.destroy();
        return [null,user];
    }
    catch (e) {
        return [e.message,null];
    }
}


export default {
    getAll,
    getById,
    update,
    remove,
    create,
    getMisTutos,
    getByBuscador,
    getFavoritos
};