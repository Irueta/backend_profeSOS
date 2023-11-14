import usersModel from "../../models/usersModel.js";


const getAll = async() => {
    try{
        const users = await usersModel.findAll();
        return users;
    }catch(e){
        return [e.message,null];
    }
}


const getById = async (id) => {
    try {
        const usuario = await usersModel.findByPk(id);
        return usuario;
    }
    catch (e) {
        return [e.message, null];
    }
}

const create = async (nombre,apellido,email,password) => {
    if (nombre === undefined || apellido === undefined || email === undefined || password === undefined) {
        const error = "Todos los valores deben ser definidos";
        return [error, null];
    }
    try {
        const usuario = await usersModel.create({nombre,apellido,email,password});
        return [null, usuario];
    }
    catch (e) {
        return [e.message, null];
    }
}

const update = async(req,res) => {
        const {nombre,apellido,password,passwordConfirm} = req.body;
        if(password !== passwordConfirm){
            const errorUri = encodeURIComponent("Las contraseñas no coinciden");
            return res.redirect("/register?error=" + errorUri);
        }
    
        try{
            const user= await usersModel.findByPk(id);
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
        const user = await usersModel.findByPk(id);
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
    create
};