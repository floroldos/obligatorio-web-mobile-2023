import express from 'express'
import { getTemas, getTemaById, createTema, updateTema, deleteTema  } from '../controllers/temas.controller'

const router = express.Router()

// Metodo Post // //Crear tema //
router.post('/tema', createTema);

// Metodo Get // // Obtener todas las temas //
router.get('/tema', getTemas);

// Metodo Get // // Obtener tema por id //
router.get('/tema/:id', getTemaById);

// Metodo Put // // Actualizar tema //
router.put('/tema/:id', updateTema);

// Metodo Delete // // Eliminar tema //
router.delete('/tema/:id', deleteTema);

export default router
