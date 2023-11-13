import express from 'express'
import { getActividad, getActividadById, createActividad, updateActividad, deleteActividad  } from '../controllers/actividades.controller'

const router = express.Router()

// Metodo Post // //Crear actividad //
router.post('/crearActividad', createActividad);

// Metodo Get // // Obtener todas las actividades //
router.get('/actividad', getActividad);

// Metodo Get // // Obtener actividad por id //
router.get('/actividad/:id', getActividadById);

// Metodo Put // // Actualizar actividad //
router.put('/actividad/:id', updateActividad);

// Metodo Delete // // Eliminar actividad //
router.delete('/actividad/:id', deleteActividad);

export default router;
