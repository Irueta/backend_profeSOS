import connection from "../config/mysql.js";


const findNombreTema= async ()=>{
    const queryString = "SELECT nombre FROM temas;";
    const [rows,fields] = await connection.query(queryString);
    return rows;
}

const findTemas= async ()=>{
    const queryString = "SELECT * FROM temas;";
    const [rows,fields] = await connection.query(queryString);
    return rows;
}


const findIdTemaByName=async(name)=>{
    const queryString = `SELECT idTema FROM temas WHERE nombre=${name};`;
    const [rows,fields] = await connection.query(queryString);
    return rows;
}


export default{
    findNombreTema,
    findIdTemaByName,
    findTemas
    
}