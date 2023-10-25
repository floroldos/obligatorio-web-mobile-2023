import express from 'express'

// Juego -- -id -nombre -codigo -estaJugando

const router = express.Router()

var juegos: any[] = [];

// Metodo Get //
router.get('/juegos', (req, res)=> {
    res.send(juegos);
});

// Metodo Post //
router.post('/juegos', (req, res)=> {
    let juego = {
        id: req.body.id,
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        estaJugando: req.body.estaJugando
    }
    juegos.push(juego) 
    res.send(juego);
});

// Metodos Delete //
router.delete('/juegos/:id', (req, res)=> {
    let id = req.params.id;
    juegos = juegos.filter((juego) => juego.id != id);
    res.send(juegos);
});

export default router