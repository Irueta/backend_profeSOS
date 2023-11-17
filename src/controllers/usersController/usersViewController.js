import usersController from "./usersController.js";

 const getAll = async (req,res) =>{
    const usuarios = await usersController.getAll();
    /* res.json(usuarios); */
    res.render("users/list",{usuarios})
}

const getById = async (req,res) =>{
    const id = req.params.id;
    const usuario = await usersController.getById(id);
    /* res.json(usuario) */
    console.log("ESTE ES EL USUARIO",usuario)
    res.render("users/show",{usuario})
}

const createForm = (req,res)=>{
    const error = req.query.error;
    res.render("users/new",{error});
}

const create = async(req,res) =>{
    const {nombre,apellido,email,password} = req.body;
    const [error,usuario] = await usersController.create(nombre,apellido,email,password);
    if(error){
        const uriError = encodeURIComponent(error);
        return res.redirect(`/users/new?error=${uriError}`)
    }
    res.redirect("/");
}

const updateForm = async(req,res) =>{
    const id = req.params.id;
    const usuario = await usersController.getById(id);
    console.log(usuario)
    //if(!usuario){
     //   res.redirect("/");
   // }
    console.log(req.session.user)
    res.render("users/edit",{usuario,session:req.session});
}


const myUpdateForm = async(req,res) =>{
    console.log("USUARIO PARA UPDATE",req.session.user)
    const id = req.session.user.id;
    const idLink=req.params.id;
    if (id ==idLink || id==1){
        const usuario = await usersController.getById(id);
        res.render("users/edit",usuario);
/*         console.log("USUARIO LOGEADO", req.session.user)
        res.json(usuario) */
    }
}


const update = async(req,res) =>{
    const id = req.params.id;
    const {nombre,apellido,password,passwordConfirm} = req.body;
    console.log("PARA USERUPDATE", req.body)
    const usuario = await usersController.update(nombre,apellido,password,passwordConfirm);
    res.redirect(`/users/${id}`);
};

const remove = async (req,res)=>{
    const id = req.params.id;
    const usuario = await usersController.remove(id);
    if(error){
        const uriError = encodeURIComponent(error);
        return res.redirect(`/users?error=${uriError}`);
    }
    res.redirect("/users");
}

export default{
    getAll,
    getById,
    create,
    createForm,
    update,
    updateForm,
    remove,
    myUpdateForm
};