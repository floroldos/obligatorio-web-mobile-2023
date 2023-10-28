import express from 'express'
const userSchema = require('../models/users');
const router = express.Router()

// Users -- -id -nombre -password -email

// Metodo Post // //Crear usuario //
router.post('/user', (req, res)=> {
  const user = userSchema(req.body)
  user
    .save()
    .then((user: any) => res.json(user))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Get // // Obtener todos los usuarios //
router.get('/user', (req, res)=> {
  userSchema
    .find()
    .then((user: any) => res.json(user))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Get // // Obtener usuario por id //
router.get('/user/:id', (req, res)=> {
  const { id } = req.params;
  userSchema
    .findById( id )
    .then((user: any) => res.json(user))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Put // // Actualizar usuario //
router.put('/user/:id', (req, res)=> {
  const { id } = req.params;
  const { userName, email, password } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { userName, email, password } })
    .then((user: any) => res.json(user))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Delete // // Eliminar usuario //
router.delete('/user/:id', (req, res)=> {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((user: any) => res.json(user))
    .catch((err: any) => res.json('Error: ' + err));
});

export default router
