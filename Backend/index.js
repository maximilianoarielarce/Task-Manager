const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./src/config/database')
const tareasRoutes = require('./src/routes/tareas.routes')
const { errorHandler, notFound } = require('./src/middlewares/errorHandler')

// Cargar variables de entorno
dotenv.config()

// Conectar a MongoDB
connectDB()

const app = express()

// ─── MIDDLEWARES GLOBALES ──────────────────────────────────
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ─── RUTAS ────────────────────────────────────────────────
app.use('/api/tareas', tareasRoutes)

// Ruta raíz para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API funcionando',
    version: '1.0.0',
    endpoints: {
      tareas: '/api/tareas'
    }
  })
})

// ─── MANEJO DE ERRORES ────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ─── INICIAR SERVIDOR ─────────────────────────────────────
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
  console.log(`Entorno: ${process.env.NODE_ENV}`)
})
