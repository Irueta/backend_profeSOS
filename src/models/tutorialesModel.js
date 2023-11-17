import connection from "../config/mysql.js";


const findAll= async ()=>{
    const queryString = "SELECT tutoriales.nombre AS titulo, tutoriales.descripcion, temas.nombre AS tema, CONCAT(usuarios.nombre,' ', usuarios.apellido) AS autor, COUNT(votos.idTutorial) AS totalVotos FROM tutoriales JOIN temas ON tutoriales.idTema = temas.idTema JOIN usuarios ON usuarios.idUsuario = tutoriales.idAutor LEFT JOIN votos ON votos.idTutorial = tutoriales.idTutorial GROUP BY tutoriales.idTutorial, tutoriales.nombre, tutoriales.descripcion, temas.nombre, usuarios.nombre, usuarios.apellido ORDER BY totalVotos DESC;";
    const [rows,fields] = await connection.query(queryString);
    console.log(rows);
    console.log(fields);
    return rows;
}

const findAllBuscador=async (titulo,tema,descripcion,autor)=>{
   /*  const {titulo,tema,descripcion,autor}=req.body; */
   titulo= titulo==undefined?"":titulo
   tema= tema==undefined?"":tema
   descripcion= descripcion==undefined?"":descripcion
   autor= autor==undefined?"":autor
   console.log("ESTA ES LA BUENA",titulo,tema,descripcion,autor)
    let queryString = `SELECT tutoriales.nombre AS titulo, tutoriales.descripcion, temas.nombre AS nombre_tema, CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS autor, COUNT(votos.idTutorial) AS totalVotos, tutoriales.idTutorial, tutoriales.repositorio FROM tutoriales JOIN temas ON tutoriales.idTema = temas.idTema JOIN usuarios ON usuarios.idUsuario = tutoriales.idAutor LEFT JOIN votos ON votos.idTutorial = tutoriales.idTutorial WHERE tutoriales.nombre LIKE '%${titulo}%' AND tutoriales.descripcion LIKE '%${descripcion}%' `
    if(tema!==""){
        queryString+=` AND temas.idTema='${tema}'`
    }
     queryString+= ` AND CONCAT(usuarios.nombre, ' ', usuarios.apellido) LIKE '%${autor}%' GROUP BY tutoriales.idTutorial, tutoriales.nombre, tutoriales.descripcion, tutoriales.repositorio, temas.nombre, usuarios.nombre, usuarios.apellido ORDER BY totalVotos DESC;`;
    const [rows,fields] = await connection.query(queryString);
    return rows;
}



const findByPk = async (id) =>{
    const queryString = `SELECT * FROM tutoriales WHERE idTutorial="${id}";`;
    const [rows,fields] = await connection.query(queryString);
    console.log(rows);
    console.log(fields);
    return rows[0];
} 


const findByAutor = async (autor) =>{
    const queryString = `SELECT tutoriales.nombre AS titulo, tutoriales.descripcion, temas.nombre AS nombre_tema, CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS autor, COUNT(votos.idTutorial) AS totalVotos, tutoriales.idTutorial, tutoriales.repositorio FROM tutoriales JOIN temas ON tutoriales.idTema = temas.idTema JOIN usuarios ON usuarios.idUsuario = tutoriales.idAutor LEFT JOIN votos ON votos.idTutorial = tutoriales.idTutorial WHERE tutoriales.idAutor="${autor}" GROUP BY tutoriales.idTutorial, tutoriales.nombre, tutoriales.descripcion, temas.nombre, usuarios.nombre, usuarios.apellido ORDER BY totalVotos DESC;`;
    const [rows,fields] = await connection.query(queryString,[autor]);
    console.log(rows);
    console.log(fields);
    return rows;
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



const findByLiked = async(usuario)=>{
    let queryString = `SELECT tutoriales.nombre AS titulo, tutoriales.descripcion, temas.nombre AS tema, CONCAT(usuarios.nombre,' ', usuarios.apellido) AS autor, COUNT(votos.idTutorial) AS totalVotos FROM tutoriales JOIN temas ON tutoriales.idTema = temas.idTema JOIN usuarios ON usuarios.idUsuario = tutoriales.idAutor LEFT JOIN votos ON votos.idTutorial = tutoriales.idTutorial WHERE votos.idUsuario="${usuario}" GROUP BY tutoriales.idTutorial, tutoriales.nombre, tutoriales.descripcion, temas.nombre, usuarios.nombre, usuarios.apellido ORDER BY totalVotos DESC;`;
    const [rows,fields] = await connection.query(queryString);
    return rows;
}



export default {
    findAll,
    findByAutor,
    findByLiked,
    update,
    create,
    remove,
    findByPk,
    findAllBuscador
    
}