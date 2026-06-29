const express = require('express')
const cors = require('cors')
const connectDB = require('./src/config/database')
const tareasRoutes = require('./src/routes/tareas.routes')
const { errorHandler, notFound } = require('./src/middlewares/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// En Vercel cada request es serverless: conectar (o reutilizar) antes de rutas
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (error) {
    next(error)
  }
})

app.use('/api/tareas', tareasRoutes)

app.get('/api', (req, res) => {
  res.json({
    message: 'Task Manager API funcionando',
    version: '1.0.0',
    endpoints: {
      tareas: '/api/tareas'
    }
  })
})

app.use(notFound)
app.use(errorHandler)

module.exports = app
