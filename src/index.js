import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";
import session from "express-session";

dotenv.config();
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: {
        secure:false,
        maxAge: 1000 * 60 * 20
    }
}))
app.set('views', './src/views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("home");
});

app.use("/",router);


app.listen(3006,()=>{
    console.log("servidor en marcha en el puerto 3006");
});