import express from 'express'
import juegosRouter from './routes/juegos'
import temasRouter from './routes/temas'
import actividadesRouter from './routes/actividades'
import userRoutere from './routes/user'
var jwt = require('jsonwebtoken');

const app = express()
app.use(express.json()) //middleware

const PORT = 3000

app.get('/test', (req, res) => {    
    console.log("hello world");
    res.send('V 1.1')
})

app.use('/api/jueos', juegosRouter)
app.use('/api/temas', temasRouter)
app.use('/api/actividades', actividadesRouter)
app.use('/api/Users', userRoutere)

// Login //
app.post('/api/login', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    if (user === 'admin' && password === 'admin') {
        const token = jwt.sign({user}, 'my_secret_key');
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
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
