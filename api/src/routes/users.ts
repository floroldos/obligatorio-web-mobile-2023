import express from 'express';
const userSchema = require('../models/users');
const router = express.Router()
import jwt from "jsonwebtoken";
const secret = 'la_mama_de_la_mama_de_la_mama';

// Metodo Post // //Crear usuario // Sign up //
router.post('/user', (req, res)=> {
  const { userName, email, password } = req.body;
  const token = jwt.sign({
    userName,
    email
  }, secret);
  const user = new userSchema({ userName, email, password, token });
  user
    .save()
    .then((user: any) => res.json(user))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Get // // Obtener todos los usuarios //
router.get('/user', validateToken,(req, res)=> {
  userSchema
    .find()
    .then((user: any) => res.json(user))
    .catch((err: any) => res.json('Error: ' + err));
});

// Metodo Get // // Obtener usuario por id //
router.get('/user/:id', validateToken, (req, res)=> {
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

// Validation token //
function validateToken(req: any, res: any, next: any){
    let bearer = req.headers['authorization'] || req.query.accessToken;
    if (!bearer) res.send('No autorizado');
    jwt.verify(bearer, secret, (err: any, user: any) => {
      if(err) res.send('No autorizado');
      else {
        req.user = user;
        next();
      }
    });
};

export default router
