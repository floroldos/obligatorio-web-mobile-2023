import express from 'express'
import juegosRouter from './routes/juegos'
import temasRouter from './routes/temas'
import actividadesRouter from './routes/actividades'
import userRouter from './routes/users'
import mongoose from 'mongoose'
import { uri } from './enviorment'
import { sala } from '../../../Frontend/src/app/sala'


//const jwt = require('jsonwebtoken');
const app = express();

let jugadores: string[] = [];

// Middleware //
app.use(express.json())
app.use('/api', juegosRouter, temasRouter, userRouter, actividadesRouter);

const PORT = 3000;

/* --------------- SOCKET.IO --------------- */

//Crea un servidor de socket.io
const io = require('socket.io')(PORT + 1, { cors: { origin: '*' } });

//Crea un namespace de socket.io para el juego
const gameNamespace = io.of("/game");

//Event handler para cuando un usuario se conecta
gameNamespace.on('connection', (socket: any) => {
  console.log('User connected');
  socket.emit('confirmar', jugadores);

  socket.on('disconnection', (socket : any) => {
    jugadores.splice(gameNamespace.id, -1);
    gameNamespace.emit('confirmar', jugadores);
  });

  socket.on('entrarSala', (data: string) => {
    jugadores[gameNamespace.id] = data;
    gameNamespace.emit('confirmar', jugadores);
  }

  );

  socket.on('message', (data: any) => {
    gameNamespace.emit('message', data);
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
    console.log("ME navegaron");
    
    setTimeout(() => {
      console.log("CONFIRMO NAVEGAR");
      socket.emit('navegar', sala);
    }, 5000);
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

mongoose
  .connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error: any) => console.error(error));

app.get('/', (req, res) => {
    console.log("Api corriendo")
    res.send('Api Obligatorio Desarrollo Web y Mobile 2023')
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

