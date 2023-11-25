const actividadSchema = require('../models/actividades.model');
import { tarjeta } from '../../../Frontend/src/app/tarjeta';

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
    const tarjeta: tarjeta = req.body["tarjetaNueva"];
    const actividad = actividadSchema(tarjeta)
    await actividad
        .save()
        .then((actividad: any) => res.json(actividad))
        .catch((err: any) => res.json('Error: ' + err));
    }

const updateActividad = async (req: any, res: any) => {
    const {id} = req.params;
    const {nombre, descripcion, imagen, puntos, temaId} = req.body;
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