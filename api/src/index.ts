import express from 'express'
import juegosRouter from './routes/juegos.router'
import temasRouter from './routes/temas.router'
import actividadesRouter from './routes/actividades.router'
import userRouter from './routes/users.router'
import jugadorRouter from './routes/jugadores.router'
import mongoose from 'mongoose'
import { uri } from './enviorment'

const app = express();
const cors = require('cors');


// Middleware //
app.use(express.json())
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api', juegosRouter);
app.use('/api', temasRouter);
app.use('/api', actividadesRouter);
app.use('/api', jugadorRouter)

const PORT = 3000;

/* --------------- SOCKET.IO --------------- */

//Crea un servidor de socket.io
const io = require('socket.io')(PORT + 1, { cors: { origin: '*' } });

//Event handler para cuando un usuario se conecta
io.on('connection', (socket: any) => {
  console.log('User connected');
  
//Listener de eventos de 'message' de los clientes con broadcast para que a todos les llegue
socket.on('message', (data: any) => {
    io.emit('message', data);
  });
});

// --------------- Conexion a la base de datos --------------- //

mongoose
  .connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error: any) => console.error(error)); 


// --------------- Info de la api --------------- //
app.get('/', (req, res) => {
    console.log("Api corriendo")
    res.send('Api Obligatorio Desarrollo Web y Mobile 2023')
});

// --------------- Inicia el servidor --------------- //

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});