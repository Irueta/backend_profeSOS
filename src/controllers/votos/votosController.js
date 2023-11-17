import votosModel from "../../models/votosModel.js";
import session from "express-session";

const crearVoto = async (req,res)=>{
    const idUsuario=req.session.user.id;
    const idTutorial=req.body.idTutorial;
    const idAutor=req.body.idAutor;
    try{
        const hasVotado=await votosModel.findVotado(idUsuario, idTutorial);
        console.log("HASVOTADO",hasVotado)
        if(hasVotado!==null){
        return res.redirect("/tutoriales/misTutos");
        }
        const darLike= await votosModel.votar(idUsuario, idTutorial, idAutor);
        return res.redirect("/tutoriales/search");

    }catch(e){
        console.log(e)
    }
}

export default {
    crearVoto
}