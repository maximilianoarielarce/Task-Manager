const express = require('express')
const router = express.Router()
const {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  toggleTarea,
  deleteTarea
} = require('../controllers/tareas.controller')
const { validarTarea } = require('../middlewares/validarTarea')

// GET    /api/tareas              → obtener todas (con filtros opcionales)
// POST   /api/tareas              → crear nueva
router.route('/')
  .get(getTareas)
  .post(validarTarea, createTarea)

// GET    /api/tareas/:id          → obtener una
// PUT    /api/tareas/:id          → actualizar completa
// DELETE /api/tareas/:id          → eliminar
router.route('/:id')
  .get(getTareaById)
  .put(validarTarea, updateTarea)
  .delete(deleteTarea)

// PATCH  /api/tareas/:id/toggle   → cambiar estado completada
router.patch('/:id/toggle', toggleTarea)

module.exports = router
