import express from 'express'
const juegoSchema  = require('../models/juegos');
const router = express.Router()

// Juego -- -nombre -codigo -estaJugando

// Metodo Post // //Crear juego //
router.post('/juego', (req, res)=> {
  const juego = juegoSchema(req.body)
  juego
    .save()
    .then((juego: any) => res.json(juego))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Get // // Obtener todos los juegos //
router.get('/juego', (req, res)=> {
  juegoSchema
    .find()
    .then((juego: any) => res.json(juego))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Get // // Obtener juego por id //
router.get('/juego/:codigo', (req, res)=> {
  const { codigo } = req.params;
  juegoSchema
    .find( { codigo: codigo } )
    .then((juego: any) => res.json(juego))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Put // // Actualizar juego //
router.put('/juego/:id', (req, res)=> {
  const { id } = req.params;
  const { nombre, codigo, estaJugando } = req.body;
  juegoSchema
    .updateOne({ _id: id }, { $set: { nombre, codigo, estaJugando } })
    .then((juego: any) => res.json(juego))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Delete // // Eliminar juego //
router.delete('/juego/:id', (req, res)=> {
  const { id } = req.params;
  juegoSchema
    .deleteOne({ _id: id })
    .then((juego: any) => res.json(juego))
    .catch((err: any) => res.json('Error: ' + err));
});

export default router
