import express  from "express"; 

import dotenv from "dotenv";
import connectDB from "./src/db/bd.js";
import UserRouter from "./src/route/userRouter.js";
import TareaRouter from "./src/route/tareaRoute.js";
import cors from "cors";


// creacion de servidor
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
dotenv.config(); 
connectDB(); 
// cors para que se pueda conectar con el front

const dominiosPermitidos = ["http://localhost:5173"] // dominios permitidos para recibir peticiones


const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            // El origen del request esta permitido
            callback(null, true);
        }else{
            callback(new Error('No esta permitido por CORS'))
        }
    }
}
app.use(cors({ origin: '*' }))


// rutas de  la aplicacion


app.use("/api/usuario", UserRouter);
app.use("/api/tarea", TareaRouter);



// para correr el servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Servidor ejecutandose en el puerto 4000");
});