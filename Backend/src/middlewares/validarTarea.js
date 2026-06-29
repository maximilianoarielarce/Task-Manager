// Valida que el body tenga los campos requeridos antes de llegar al controlador
const validarTarea = (req, res, next) => {
  const { nombre } = req.body

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({
      ok: false,
      message: 'El campo nombre es obligatorio'
    })
  }

  if (nombre.trim().length > 100) {
    return res.status(400).json({
      ok: false,
      message: 'El nombre no puede superar los 100 caracteres'
    })
  }

  const prioridadesValidas = ['baja', 'media', 'alta']
  if (req.body.prioridad && !prioridadesValidas.includes(req.body.prioridad)) {
    return res.status(400).json({
      ok: false,
      message: 'La prioridad debe ser baja, media o alta'
    })
  }

  next()
}

module.exports = { validarTarea }
