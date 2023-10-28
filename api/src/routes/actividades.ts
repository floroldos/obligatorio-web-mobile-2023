import express from 'express'

// Actividades -- -id -nombre -descripcion -imagen -temaId

const router = express.Router()

var actividades: any[] = [];

// Metodo Post // // Crear Usuario //
router.post('/actividades', (req, res)=> {
  let actividad = {
    id: req.body.id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    temaId: req.body.temaId
  }
  actividades.push(actividad)
  res.send(actividad);
});


// Metodo Get //
router.get('/actividades', (req, res)=> {
    res.send(actividades);
});

// Metodos Delete //
router.delete('/actividades/:id', (req, res)=> {
    let id = req.params.id;
    actividades = actividades.filter((actividad) => actividad.id != id);
    res.send(actividades);
});


export default router
