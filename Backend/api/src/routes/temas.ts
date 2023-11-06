import express from 'express'
const temaSchema = require('../models/temas');

const router = express.Router()

// Metodo Post // //Crear tema //
router.post('/tema', (req, res)=> {
  const tema = temaSchema(req.body)
  tema
    .save()
    .then((tema: any) => res.json(tema))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Get // // Obtener todas las temas //
router.get('/tema', (req, res)=> {
  temaSchema
    .find()
    .then((tema: any) => res.json(tema))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Get // // Obtener tema por id //
router.get('/tema/:id', (req, res)=> {
  const { id } = req.params;
  temaSchema
    .findById( id )
    .then((tema: any) => res.json(tema))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Put // // Actualizar tema //
router.put('/tema/:id', (req, res)=> {
  const { id } = req.params;
  const { nombre, descripccion } = req.body;
  temaSchema
    .updateOne({ _id: id }, { $set: { nombre, descripccion } })
    .then((tema: any) => res.json(tema))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Delete // // Eliminar tema //
router.delete('/tema/:id', (req, res)=> {
  const { id } = req.params;
  temaSchema
    .deleteOne({ _id: id })
    .then((tema: any) => res.json(tema))
    .catch((err: any) => res.json('Error: ' + err));
});

export default router
