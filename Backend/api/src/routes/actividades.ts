import express from 'express'
const actividadSchema = require('../models/actividades');

const router = express.Router()

// Metodo Post // //Crear actividad //
router.post('/actividad', (req, res)=> {
  const actividad = actividadSchema(req.body)
  actividad
    .save()
    .then((actividad: any) => res.json(actividad))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Get // // Obtener todas las actividades //
router.get('/actividad', (req, res)=> {
  actividadSchema
    .find()
    .then((actividad: any) => res.json(actividad))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Get // // Obtener actividad por id //
router.get('/actividad/:id', (req, res)=> {
  const { id } = req.params;
  actividadSchema
    .findById( id )
    .then((actividad: any) => res.json(actividad))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Put // // Actualizar actividad //
router.put('/actividad/:id', (req, res)=> {
  const { id } = req.params;
  const { nombre, descripcion, imagen, temaId } = req.body;
  actividadSchema
    .updateOne({ _id: id }, { $set: { nombre, descripcion, imagen, temaId } })
    .then((actividad: any) => res.json(actividad))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Delete // // Eliminar actividad //
router.delete('/actividad/:id', (req, res)=> {
  const { id } = req.params;
  actividadSchema
    .deleteOne({ _id: id })
    .then((actividad: any) => res.json(actividad))
    .catch((err: any) => res.json('Error: ' + err));
});

export default router
