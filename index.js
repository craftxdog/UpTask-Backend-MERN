import express from 'express'
import { configDotenv } from 'dotenv';
import cors from 'cors'
import connectingDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'


const app = express();
app.use(express.json());

configDotenv();

connectingDB();

// Configurando CORS
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin:function(origin, callback){
        if(whitelist.includes(origin)){
            //Puede consultar la API
            callback(null, true)
        }else{
            //No permitido
            callback(new Error('Error de Cors'))
        }
    }
};

app.use(cors(corsOptions));

//Routing
app.use('/api/users', userRoutes);
app.use('/api/proyectos', projectRoutes);
app.use('/api/tareas', tareaRoutes);

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})