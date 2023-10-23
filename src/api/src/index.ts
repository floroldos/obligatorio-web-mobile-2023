import express from 'express'
import juegosRouter from './routes/juegos'
import temasRouter from './routes/temas'
import actividadesRouter from './routes/actividades'

const app = express()
app.use(express.json()) //middleware

const PORT = 3000

app.get('/test', (req, res) => {    
    console.log("hello world");
    res.send('V 1.1')
})

app.use('/api/jueos', juegosRouter)
app.use('/api/tema', temasRouter)
app.use('/api/actividades', actividadesRouter)

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
