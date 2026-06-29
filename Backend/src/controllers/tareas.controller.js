const Tarea = require('../models/Tarea.model')

// ─── GET /api/tareas ──────────────────────────────────────
// Obtener todas las tareas con filtros opcionales
const getTareas = async (req, res, next) => {
  try {
    const { prioridad, completada } = req.query
    const filtros = {}

    // Aplicar filtros si vienen en la query
    if (prioridad) filtros.prioridad = prioridad
    if (completada !== undefined) filtros.completada = completada === 'true'

    const tareas = await Tarea.find(filtros).sort({ createdAt: -1 })

    res.json({
      ok: true,
      cantidad: tareas.length,
      data: tareas
    })
  } catch (error) {
    next(error)
  }
}

// ─── GET /api/tareas/:id ──────────────────────────────────
// Obtener una tarea por ID
const getTareaById = async (req, res, next) => {
  try {
    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
      return res.status(404).json({
        ok: false,
        message: 'Tarea no encontrada'
      })
    }

    res.json({ ok: true, data: tarea })
  } catch (error) {
    next(error)
  }
}

// ─── POST /api/tareas ─────────────────────────────────────
// Crear una nueva tarea
const createTarea = async (req, res, next) => {
  try {
    const { nombre, descripcion, prioridad } = req.body

    const tarea = await Tarea.create({ nombre, descripcion, prioridad })

    res.status(201).json({
      ok: true,
      message: 'Tarea creada correctamente',
      data: tarea
    })
  } catch (error) {
    next(error)
  }
}

// ─── PUT /api/tareas/:id ──────────────────────────────────
// Actualizar una tarea completa
const updateTarea = async (req, res, next) => {
  try {
    const { nombre, descripcion, prioridad, completada } = req.body

    const tarea = await Tarea.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, prioridad, completada },
      {
        new: true,         // retorna el documento actualizado
        runValidators: true // ejecuta las validaciones del schema
      }
    )

    if (!tarea) {
      return res.status(404).json({
        ok: false,
        message: 'Tarea no encontrada'
      })
    }

    res.json({
      ok: true,
      message: 'Tarea actualizada correctamente',
      data: tarea
    })
  } catch (error) {
    next(error)
  }
}

// ─── PATCH /api/tareas/:id/toggle ────────────────────────
// Cambiar solo el estado completada/pendiente
const toggleTarea = async (req, res, next) => {
  try {
    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
      return res.status(404).json({
        ok: false,
        message: 'Tarea no encontrada'
      })
    }

    tarea.completada = !tarea.completada
    await tarea.save()

    res.json({
      ok: true,
      message: `Tarea marcada como ${tarea.completada ? 'completada' : 'pendiente'}`,
      data: tarea
    })
  } catch (error) {
    next(error)
  }
}

// ─── DELETE /api/tareas/:id ───────────────────────────────
// Eliminar una tarea
const deleteTarea = async (req, res, next) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id)

    if (!tarea) {
      return res.status(404).json({
        ok: false,
        message: 'Tarea no encontrada'
      })
    }

    res.json({
      ok: true,
      message: 'Tarea eliminada correctamente',
      data: tarea
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  toggleTarea,
  deleteTarea
}
