import express from 'express'
import juegosRouter from './routes/juegos'
import temasRouter from './routes/temas'
import actividadesRouter from './routes/actividades'
import userRouter from './routes/users'
// import mongoose from 'mongoose'
// import { uri } from './enviorment'
import { sala } from '../../../Frontend/src/app/sala'
import { createServer } from "http";


//const jwt = require('jsonwebtoken');
const app = express();

let jugadores: string[] = [];

// Middleware //
app.use(express.json())
app.use('/api', juegosRouter, temasRouter, userRouter, actividadesRouter);

const PORT = 3000;

const httpServer = createServer(app);


let ws = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});


/* --------------- SOCKET.IO --------------- */

//Crea un servidor de socket.io

//Crea un namespace de socket.io para el juego
//Event handler para cuando un usuario se conecta
ws.on("connection", (socket: any) => {
  console.log("Se conecto un usuario");
  ws.emit('connection');
  //ACA YO PONDRIA UN CHECK DE QUE SI LA PARTIDA YA EMPEZO Y ALGUIEN SE CONECTA LE EMITA UN socket.emit('navegar', sala);
  //PORQUE SI RECARGA LA PAGINA PIERDE EL CONTENIDO ;)

  socket.emit('confirmar', jugadores);

  socket.on('disconnection', (socket : any) => {
    jugadores.splice(socket.id, -1);
    ws.emit('confirmar', jugadores);
  });

  socket.on('entrarSala', (data: string) => {
    jugadores[socket.id] = data;
    ws.emit('confirmar', jugadores);
  });

  socket.on('message', (data: { [key: string]: any }) => {
    console.log(`Mensaje recibido: ${data}`);
    ws.broadcast.emit('message', data);
  });

  socket.on('crearSala', (data: { [key: string]: any }) =>{
    sala = {
      codigoSala: data['crearSala'].codigoSala,
      propuesta: data['crearSala'].propuesta,
      tarjetasSala: data['crearSala'].tarjetasSala,
      tarjetaActualSala: data['crearSala'].tarjetaActualSala,
      estadoActual: data['crearSala'].estadoActual,
      jugadores: data['crearSala'].jugadores
    }
  });

  socket.on('navegar', (data : any) => {
      socket.emit('navegar', sala);
  });
});

let sala = {
    codigoSala: -1,
    propuesta: '',
    tarjetasSala: [],
    tarjetaActualSala: {},
    estadoActual: false,
    jugadores: []
}

// --------------- Conexion a la base de datos --------------- //

/*
mongoose
  .connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error: any) => console.error(error));
*/

app.get('/', (req, res) => {
    console.log("Api corriendo")
    res.send('Api Obligatorio Desarrollo Web y Mobile 2023')
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

