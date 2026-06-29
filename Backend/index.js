require('dotenv').config()

const app = require('./app')
const connectDB = require('./src/config/database')

const PORT = process.env.PORT || 3000

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
      console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`)
    })
  })
  .catch((error) => {
    console.error(`No se pudo iniciar el servidor: ${error.message}`)
    process.exit(1)
  })
