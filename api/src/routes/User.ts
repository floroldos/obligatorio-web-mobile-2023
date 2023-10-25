import express from 'express'

// Temas -- -id -nombre -descripcion

const router = express.Router()

var users: Map<string, string> = new Map();
var password: Map<string, string> = new Map();

// Metodo Get //
router.get('/user', (req, res)=> {
    res.send(users);
});

// Metodo Post //
router.post('/user', (req, res)=> {
    let user = {
        id: req.body.id,
        nombre: req.body.nombre,
        password: req.body.password
    }
    users.set(user.id, user.nombre);
    password.set(user.nombre, user.password);
    res.send(user);
});

// Metodo Delete //
router.delete('/temas/:id', (req, res)=> {
    let id = req.params.id;
    usesrs = temas.filter((tema) => tema.id != id);
    res.send(temas);
});

export default router