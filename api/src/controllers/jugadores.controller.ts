const jugadores: any[] = [];

const getJugadores = (req: any, res: any) => {
    res.send({'jugadores' : jugadores});
}

const deleteJugador = (req: any, res: any) => {
    const jugador  = req.params.nick;
    const index = jugadores.indexOf(jugador);
    console.log( jugador, index);
    
    if (index !== -1) {
        jugadores.splice(index, 1);
        res.send(`Jugador ${jugador} eliminado`);
    } else {
        res.status(404).send(`Jugador ${jugador} no encontrado`);
    }
}

const deleteAllJugadores = async (req: any, res: any) => {
    await jugadores.splice(0, jugadores.length);
}

const postJugadores = async (req: any, res: any) => {
    console.log( 'Post jugador', req.body.nickname);
    const user = (req.body.nickname);
    await jugadores.push(user);
}

export { getJugadores, deleteJugador, deleteAllJugadores, postJugadores }