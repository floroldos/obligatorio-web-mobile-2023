import express from 'express'
import { getJuegos, getJuegoById, createJuego, updateJuego, deleteJuego, deleteAll } from "../controllers/juegos.controller";

const router = express.Router();

// Metodo Post // //Crear juego //
router.post('/crearJuego', createJuego);

// Metodo Get // // Obtener todos los juegos //
router.get('/juego', getJuegos);

// Metodo Get // // Obtener juego por id //
router.get('/juego/:id', getJuegoById);

// Metodo Put // // Actualizar juego //
router.put('/juego/:id', updateJuego);

// Metodo Delete // // Eliminar juego //
router.delete('/juego/:id', deleteJuego);

router.delete('/juego', deleteAll);

export default router;
