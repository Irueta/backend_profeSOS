import votosModel from "../../models/votosModel.js";
import session from "express-session";

const crearVoto = async (req,res)=>{
    const idUsuario=req.session.user.id;
    const idTutorial=req.body.idTutorial;
    const idAutor=req.body.idAutor;
    // const hasVotado=await votosModel.findVotado(idUsuario, idTutorial);
    // if(hasVotado){
    //     throw new Error("Ya le has dado like a este tutorial"), res.redirect("/tutoriales/search");
    // }
    const darLike= await votosModel.votar(idUsuario, idTutorial, idAutor);
    return res.redirect("/tutoriales/search");
}

export default {
    crearVoto
}