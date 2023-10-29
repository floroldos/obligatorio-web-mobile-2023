import express from 'express'
import juegosRouter from './routes/juegos'
import temasRouter from './routes/temas'
import actividadesRouter from './routes/actividades'
import userRouter from './routes/users'
import mongoose from 'mongoose'

const app = express()


// Middleware //
app.use(express.json())
app.use('/api', juegosRouter, temasRouter, userRouter, actividadesRouter);

const PORT = 3000;

// Conexion a la base de datos //
mongoose
  .connect("mongodb://root:weberos@localhost:27017/test?authSource=admin&w=1")
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error: any) => console.error(error));

app.get('/', (req, res) => {
    console.log("Api corriendo")
    res.send('Api Obligatorio Desarrollo Web y Mobile 2023')
});

//Acceso al token //
app.post('/api/token', (req, res) => {
  const token = null;
  res.send(token);
});

app.get("/api/public", (req, res) => {
  res.send("Soy publico");
});

app.get("/api/private", (req, res) => {
  try {
    res.send("Soy privado");
  }
  catch (error) {
    res.status(401).send("No autorizado");
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
