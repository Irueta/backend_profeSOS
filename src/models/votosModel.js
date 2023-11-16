import connection from "../config/mysql.js";

const create = async(data) =>{
    let queryString = "INSERT INTO votos (idUsuario,idTutorial,IdAutor) VALUES (?,?,?);";
    const [rows,fields] = await connection.query(queryString,[data.idUsuario, data.idTutorial, data.idAutor]);
    console.log("rows",rows);
    console.log("fields",fields);
    return rows;
}


const remove = async(pk) =>{
    let queryString = "DELETE FROM votos WHERE idVoto=?;";
    const [rows,fields] = await connection.query(queryString,[pk]);
    console.log("rows",rows);
    console.log("fields",fields);
    return rows;
}


const findVotado = async(idUsuario,IdTutorial)=>{
    let queryString = `SELECT * FROM votos WHERE idUsuario="${idUsuario}" AND idTutorial="${IdTutorial}" ;`;
    const [rows,fields] = await connection.query(queryString);
    console.log("rows",rows);
    console.log("fields",fields);
    return rows;
}

export default{
    create,
    remove,
    findVotado
}