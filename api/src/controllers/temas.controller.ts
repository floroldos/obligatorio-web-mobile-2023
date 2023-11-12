const temaSchema = require('../models/temas.model');

const getTemas = async (req: any, res: any) => {
    await temaSchema
        .find()
        .then((tema: any) => res.json(tema))
        .catch((err: any) => res.json('Error: ' + err));
}

const getTemaById = async (req: any, res: any) => {
    const { id } = req.params;
    await temaSchema
        .findById(id)
        .then((tema: any) => res.json(tema))
        .catch((err: any) => res.json('Error: ' + err));
}

const createTema = async (req: any, res: any) => {
    const tema = temaSchema(req.body)
    await tema
        .save()
        .then((tema: any) => res.json(tema))
        .catch((err: any) => res.json('Error: ' + err));
}

const updateTema = async (req: any, res: any) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    await temaSchema
        .updateOne({ _id: id }, { $set: { nombre, descripcion } })
        .then((tema: any) => res.json(tema))
        .catch((err: any) => res.json('Error: ' + err));
}

const deleteTema = async (req: any, res: any) => {
    const { id } = req.params;
    await temaSchema
        .deleteOne({ _id: id })
        .then((tema: any) => res.json(tema))
        .catch((err: any) => res.json('Error: ' + err));
}

export {
    getTemas,
    getTemaById,
    createTema,
    updateTema,
    deleteTema
}