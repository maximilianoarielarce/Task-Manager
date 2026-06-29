// Middleware para rutas no encontradas (404)
const notFound = (req, res, next) => {
  res.status(404).json({
    ok: false,
    message: `Ruta no encontrada: ${req.originalUrl}`
  })
}

// Middleware global de manejo de errores
const errorHandler = (err, req, res, next) => {
  // Error de ID inválido de MongoDB
  if (err.name === 'CastError') {
    return res.status(400).json({
      ok: false,
      message: 'ID inválido'
    })
  }

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const mensajes = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({
      ok: false,
      message: mensajes.join(', ')
    })
  }

  // Error genérico del servidor
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode).json({
    ok: false,
    message: err.message || 'Error interno del servidor',
    // Solo mostrar stack en desarrollo
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
}

module.exports = { notFound, errorHandler }
