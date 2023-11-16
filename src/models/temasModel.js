import connection from "../config/mysql.js";


const findNombreTema= async ()=>{
    const queryString = "SELECT nombre FROM temas;";
    const [rows,fields] = await connection.query(queryString);
    return rows;
}

const findIdTema= async ()=>{
    const queryString = "SELECT idTema FROM temas;";
    const [rows,fields] = await connection.query(queryString);
    return rows;
}

const findTemas= async ()=>{
    const queryString = "SELECT * FROM temas;";
    const [rows,fields] = await connection.query(queryString);
    return rows;
}


const findIdTemaByName=async(name)=>{
    const queryString = `SELECT idTema FROM temas WHERE nombre="${name}";`;
    const [rows,fields] = await connection.query(queryString);
    return rows;
}


const create = async(data) =>{
    let queryString = "INSERT INTO temas (nombre) VALUES (?);";
    const [rows,fields] = await connection.query(queryString,[data]);
    console.log("rows",rows);
    console.log("fields",fields);
    return rows;
}


export default{
    findNombreTema,
    findIdTemaByName,
    findTemas,
    create,
    findIdTema
    
}