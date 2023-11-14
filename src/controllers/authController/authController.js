import bcrypt from "bcrypt";
import usersModel from "../../models/usersModel.js";


const login = async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await usersModel.findByEmail(email);
        if(!user){
            throw new Error("credenciales incorrectas");
        }
        const hash = user.password;    
        if(await bcrypt.compare(password,hash)){
            req.session.user = {
                email: user.email,
                rol: user.rol,
                id:user.idUsuario,
                nombre:user.nombre,
                apellido:user.apellido
            }
            if (req.session.user.id !== 1){
                res.redirect(`/users/${req.session.user.id}`);
                } else{
                    res.redirect("/users");
                }
        }else{
            throw new Error();
        }   
    }
    catch(e){
        console.log(e)
        const errorUri = encodeURIComponent("credenciales incorrectas");
        return res.redirect("/login?error="+errorUri);
    }
}

const loginForm = (req,res) => {
    const errorMessage = req.query.error
    res.render("auth/login",{error:errorMessage});
}

const register = async(req,res) => {
    const {nombre,apellido,email,password,passwordConfirm} = req.body;
    console.log(req.body);
    if(!nombre || !apellido || !email || !password || !passwordConfirm){
        const errorUri = encodeURIComponent("Todos los campos son obligatorios");
        return res.redirect("/register?error=" + errorUri);
    }

    if(password !== passwordConfirm){
        const errorUri = encodeURIComponent("Las contraseñas no coinciden");
        return res.redirect("/register?error=" + errorUri);
    }

    try{
        const oldUser = await usersModel.findByEmail(email);
        if(oldUser){
            console.log("oldUser:",oldUser);
            const errorUri = encodeURIComponent("El usuario ya existe");
            return res.redirect("/register?error=" + errorUri);
        }
        const hash = await bcrypt.hash(password,10);
        console.log(hash);
        const newUser = await usersModel.create({
            nombre:nombre,
            apellido:apellido,
            email:email,
            password:hash
        });
        console.log(newUser.nombre,newUser.apellido,newUser.email,newUser.hash)
        req.session.user = newUser.email;
        req.session.rol = newUser.rol;
        res.redirect("/login");
    }
    catch(e){
        const errorUri= encodeURIComponent(e.message);
        return res.redirect("/register?error=" + errorUri);
    }    
}

const registerForm = (req,res) => {
    const errorMessage = req.query.error;
    res.render("auth/register", {error:errorMessage});
}

const logout = (req,res)=>{
    req.session.destroy();
    res.redirect("/login");
}
const isAdmin = async (req,res,next) =>{
    try{
        if(req.session.user && req.session.user.rol === 1){
            next();
        }else{
            const errorUri = encodeURIComponent("credenciales incorrectas");
            return res.redirect("/login?error="+errorUri);
        }
    }catch(e){
        console.log(e)
        const errorUri = encodeURIComponent("credenciales incorrectas");
        return res.redirect("/login?error="+errorUri);
    }

    }

const isLogin = async (req,res,next) =>{
    try{
        if(req.session.user){
            next();
        }else{
            const errorUri = encodeURIComponent("Debes logearte");
            return res.redirect("/login?error="+errorUri);
        }
    }catch(e){
        console.log(e)
        const errorUri = encodeURIComponent("Debes logearte");
        return res.redirect("/login?error="+errorUri);
    }

    }



export default{
    login,
    loginForm,
    logout,
    register,
    registerForm,
    isAdmin,
    isLogin
}

