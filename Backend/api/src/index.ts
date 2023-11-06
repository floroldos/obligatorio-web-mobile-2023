import express from 'express'
import juegosRouter from './routes/juegos'
import temasRouter from './routes/temas'
import actividadesRouter from './routes/actividades'
import userRouter from './routes/users'
import mongoose from 'mongoose'
import io from "socket.io-client";

const jwt = require('jsonwebtoken');
const app = express();


// Middleware //
app.use(express.json())
app.use('/api', juegosRouter, temasRouter, userRouter, actividadesRouter);

const secretKey = 'key';

let socket = io("server");

socket.on('connection', (socket) => {
  console.log('Usuario conectado');

  const token = jwt.sign({ userId: socket.id }, secretKey);
  socket.emit('token', token);
})

const PORT = 3000;

// Conexion a la base de datos //
mongoose
  .connect("mongodb://root:weberos@localhost:9999/test?authSource=admin&w=1")
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error: any) => console.error(error));

app.get('/', (req, res) => {
    console.log("Api corriendo")
    res.send('Api Obligatorio Desarrollo Web y Mobile 2023')
});

// Validation token //


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});


