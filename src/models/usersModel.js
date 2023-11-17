import connection from "../config/mysql.js";


const findAll= async ()=>{
    const queryString = "SELECT * FROM usuarios;";
    const [rows,fields] = await connection.query(queryString);
    console.log(rows);
    console.log(fields);
    return rows;
}

const findByPk = async (pk) =>{
    const queryString = "SELECT * FROM usuarios WHERE idUsuario=?;";
    const [rows,fields] = await connection.query(queryString,[pk]);
    console.log(rows);
    console.log(fields);
    return rows[0];
} 


const findByEmail = async (email) =>{
    const queryString = "SELECT * FROM usuarios WHERE email=?;";
    const [rows,fields] = await connection.query(queryString,[email]);
    console.log(rows);
    console.log(fields);
    return rows[0];
} 



const update = async(nombre,apellido,password,idUsuario) =>{
    let queryString = `UPDATE usuarios SET nombre="${nombre}", apellido="${apellido}", password="${password}" WHERE idUsuario="${idUsuario}";`;
    const [rows,fields] = await connection.query(queryString,[nombre,apellido,password,idUsuario]);
    console.log("rows",rows);
    console.log("fields",fields);
    return rows;
}

const create = async(data) =>{
    let queryString = "INSERT INTO usuarios (nombre,apellido,email,password) VALUES (?,?,?,?);";
    const [rows,fields] = await connection.query(queryString,[data.nombre,data.apellido,data.email,data.password]);
    console.log("rows",rows);
    console.log("fields",fields);
    return rows;
}

const remove = async(pk) =>{
    let queryString = "DELETE FROM usuarios WHERE idUsuario=?;";
    const [rows,fields] = await connection.query(queryString,[pk]);
    console.log("rows",rows);
    console.log("fields",fields);
    return rows;
}

export default {
    findAll,
    findByPk,
    update,
    create,
    remove,
    findByEmail
    
}