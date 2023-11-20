import express from 'express'
import {getJugadores, postJugadores, deleteAllJugadores, deleteJugador} from "../controllers/jugadores.controller"

const router = express.Router();

router.post('/jugador', postJugadores);

router.get('/jugadores', getJugadores);

router.delete('/jugadores', deleteAllJugadores);

router.delete('/jugador/:nick', deleteJugador);

export default router;