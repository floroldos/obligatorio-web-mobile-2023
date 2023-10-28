import express from 'express'
import juegosRouter from './routes/juegos'
import temasRouter from './routes/temas'
import actividadesRouter from './routes/actividades'
import userRouter from './routes/users'
import mongoose from 'mongoose'
//const jwt = require('jsonwebtoken');


const app = express()

// Middleware //
app.use(express.json())
app.use('/api', juegosRouter, temasRouter, userRouter, actividadesRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log("Api corriendo")
    res.send('Api Obligatorio Desarrollo Web y Mobile 2023')
});

// Conexion a la base de datos //
mongoose
  .connect("mongodb://root:weberos@localhost:27017/test?authSource=admin&w=1")
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error: any) => console.error(error));

// Login //
/*app.post('/api/login', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    if (user === 'admin' && password === 'admin') {
        const token = jwt.sign({user}, 'la_mama_de_mati');
        res.json({
            token
        });
    } else {
        res.status(401).send('Usuario o contraseña incorrectos');
    }
});

// Validacion de token //
function validateToken(req: any, res: any, next: any){
    let bearer = req.headers['authorization'];
    if(typeof bearer !== 'undefined'){
        bearer = bearer.split(" ");
        req.token = bearer;
        next();
    } else{
        res.state(401);
        res.send('No autorizado', 'anashe');
    }
};*/

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
