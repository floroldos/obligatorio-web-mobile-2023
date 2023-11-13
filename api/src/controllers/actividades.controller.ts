const actividadSchema = require('../models/actividades.model');

const getActividad = async (req: any, res: any) => {
    await actividadSchema
        .find
        .then((actividad: any) => res.json(actividad))
        .catch((err: any) => res.json('Error: ' + err));
}

const getActividadById = async (req: any, res: any) => {
    const {id} = req.params;
    await actividadSchema
        .findById(id)
        .then((actividad: any) => res.json(actividad))
        .catch((err: any) => res.json('Error: ' + err));
}

const createActividad = async (req: any, res: any) => {
    const actividad = actividadSchema(req.body)
    await actividad
        .save()
        .then((actividad: any) => res.json(actividad))
        .catch((err: any) => res.json('Error: ' + err));
}

const updateActividad = async (req: any, res: any) => {
    const {id} = req.params;
    const {nombre, descripcion, imagen, temaId, puntos} = req.body;
    await actividadSchema
        .updateOne({_id: id}, {$set: {nombre, descripcion, imagen, puntos, temaId}})
        .then((actividad: any) => res.json(actividad))
        .catch((err: any) => res.json('Error: ' + err));
}

const deleteActividad = async (req: any, res: any) => {
const {id} = req.params;
    await actividadSchema
        .deleteOne({_id: id})
        .then((actividad: any) => res.json(actividad))
        .catch((err: any) => res.json('Error: ' + err));
}

export {
    getActividad,
    getActividadById,
    createActividad,
    updateActividad,
    deleteActividad
}