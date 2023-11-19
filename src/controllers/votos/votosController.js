import votosModel from "../../models/votosModel.js";
import session from "express-session";

const crearVoto = async (req,res)=>{
    const idUsuario=req.session.user.id;
    const idTutorial=req.body.idTutorial;
    const idAutor=req.body.idAutor;
    try{
        const hasVotado=await votosModel.findVotado(idUsuario, idTutorial);
        if(hasVotado.length !== 0){;
            const error="No puedes dar amor al mismo tutorial más de una vez"
            const uriError = encodeURIComponent(error);
            return res.redirect(`/tutoriales/search?error=${uriError}`)
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