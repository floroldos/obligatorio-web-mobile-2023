import express from 'express'

// Temas -- -id -nombre -descripcion

const router = express.Router()

var temas: any[] = [];

// Metodo Get //
router.get('/temas', (req, res)=> {
    res.send(temas);
});

// Metodo Post //
router.post('/temas', (req, res)=> {
    let tema = {
        id: req.body.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }
    temas.push(tema) 
    res.send(tema);
});

// Metodo Delete //
router.delete('/temas/:id', (req, res)=> {
    let id = req.params.id;
    temas = temas.filter((tema) => tema.id != id);
    res.send(temas);
});

export default router