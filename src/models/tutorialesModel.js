import connection from "../config/mysql.js";


const findAll= async ()=>{
    const queryString = "SELECT tutoriales.nombre AS titulo, tutoriales.descripcion, temas.nombre AS tema, CONCAT(usuarios.nombre,' ', usuarios.apellido) AS autor, COUNT(votos.idTutorial) AS totalVotos FROM tutoriales JOIN temas ON tutoriales.idTema = temas.idTema JOIN usuarios ON usuarios.idUsuario = tutoriales.idAutor LEFT JOIN votos ON votos.idTutorial = tutoriales.idTutorial GROUP BY tutoriales.idTutorial, tutoriales.nombre, tutoriales.descripcion, temas.nombre, usuarios.nombre, usuarios.apellido;";
    const [rows,fields] = await connection.query(queryString);
    console.log(rows);
    console.log(fields);
    return rows;
}

const findAllBuscador=async ()=>{
    const titulo=req.body.titulo;
    const tema=req.body.tema;
    const descripcion=req.body.descripcion;
    const autor=req.body.auto;
    const queryString = `SELECT tutoriales.nombre AS titulo, tutoriales.descripcion, temas.nombre AS nombre_tema, CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS autor, COUNT(votos.idTutorial) AS totalVotos FROM tutoriales JOIN temas ON tutoriales.idTema = temas.idTema JOIN usuarios ON usuarios.idUsuario = tutoriales.idAutor LEFT JOIN votos ON votos.idTutorial = tutoriales.idTutorial WHERE tutoriales.nombre LIKE '%${titulo}%' OR tutoriales.descripcion LIKE '%${tema}%' OR temas.nombre LIKE '%${descripcion}%' OR CONCAT(usuarios.nombre, ' ', usuarios.apellido) LIKE '%${autor}%' GROUP BY tutoriales.idTutorial, tutoriales.nombre, tutoriales.descripcion, temas.nombre, usuarios.nombre, usuarios.apellido;`;
    const [rows,fields] = await connection.query(queryString);
    return rows;
}



const findByPk = async (pk) =>{
    const queryString = "SELECT * FROM tutoriales WHERE idTutorial=?;";
    const [rows,fields] = await connection.query(queryString,[pk]);
    console.log(rows);
    console.log(fields);
    return rows[0];
} 


const findByAutor = async (email) =>{
    const queryString = "select * from tutoriales join usuarios on idAutor=idUsuario where email=?;";
    const [rows,fields] = await connection.query(queryString,[email]);
    console.log(rows);
    console.log(fields);
    return rows[0];
} 



const update = async(data,pk) =>{
    let queryString = "UPDATE tutoriales SET nombre=?, descripcion=?, repositorio=?, idTema=?, idAutor=? WHERE idTema=?;";
    const [rows,fields] = await connection.query(queryString,[data.nombre,data.apellido,data.password,pk]);
    console.log("rows",rows);
    console.log("fields",fields);
    return rows;
}

const create = async(data) =>{
    let queryString = "INSERT INTO tutoriales (nombre,descripcion,repositorio,idTema,idAutor) VALUES (?,?,?,?,?);";
    const [rows,fields] = await connection.query(queryString,[data.nombre,data.descripcion,data.repositorio,data.idTema,data.idAutor]);
    console.log("rows",rows);
    console.log("fields",fields);
    return rows;
}

const remove = async(pk) =>{
    let queryString = "DELETE FROM tutoriales WHERE idTutorial=?;";
    const [rows,fields] = await connection.query(queryString,[pk]);
    console.log("rows",rows);
    console.log("fields",fields);
    return rows;
}

export default {
    findAll,
    findByAutor,
    update,
    create,
    remove,
    findByPk,
    findAllBuscador
    
}