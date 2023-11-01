import express from 'express'
import juegosRouter from './routes/juegos'
import temasRouter from './routes/temas'
import actividadesRouter from './routes/actividades'
import userRouter from './routes/users'
import mongoose from 'mongoose'
const app = express()
import { uri } from './enviorment'


// Middleware //
app.use(express.json())
app.use('/api', juegosRouter, temasRouter, userRouter, actividadesRouter);

const PORT = 3000;

// Conexion a la base de datos //
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

