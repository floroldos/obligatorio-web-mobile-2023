const juegoShema = require('../Models/juegos.model');

// juego == sala

const getJuegos = async (req: any, res: any) => {
    await juegoShema
        .find()
        .then((juego: any) => res.json(juego))
        .catch((err: any) => res.json('Error: ' + err));
}

const getJuegoById = async (req: any, res: any) => {
    const { id } = req.params;
    await juegoShema
        .findById( id )
        .then((juego: any) => res.json(juego))
        .catch((err: any) => res.json('Error: ' + err));
}

const createJuego = async (req: any, res: any) => {
    const juego = juegoShema(req.body);
    await juego
        .save()
        .catch((err: any) => res.json('Error: ' + err));
}

const updateJuego = async (req: any, res: any) => {
    const { id } = req.params;
    const { propuesta, codigoSala } = req.body;
    await juegoShema
        .updateOne({ _id: id }, { $set: { propuesta, codigoSala } })
        .then((juego: any) => res.json(juego))
        .catch((err: any) => res.json('Error: ' + err));
}

const deleteJuego = async (req: any, res: any) => {
    const {id} = req.params;
    await juegoShema
        .deleteOne({_id: id})
        .then((juego: any) => res.json(juego))
        .catch((err: any) => res.json('Error: ' + err));
}

const deleteAll = async (req: any, res: any) => {
    await juegoShema
        .deleteMany({})
        .then((juego: any) => res.json(juego))
        .catch((err: any) => res.json('Error: ' + err));

}

export {
    getJuegos,
    getJuegoById,
    createJuego,
    updateJuego,
    deleteJuego,
    deleteAll
}