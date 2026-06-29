const mongoose = require('mongoose')

const tareaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la tarea es obligatorio'],
      trim: true,
      maxlength: [100, 'El nombre no puede superar los 100 caracteres']
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripción no puede superar los 500 caracteres'],
      default: ''
    },
    prioridad: {
      type: String,
      enum: {
        values: ['baja', 'media', 'alta'],
        message: 'La prioridad debe ser baja, media o alta'
      },
      default: 'media'
    },
    completada: {
      type: Boolean,
      default: false
    }
  },
  {
    // Agrega automáticamente createdAt y updatedAt
    timestamps: true,
    // Limpia el objeto al convertir a JSON (elimina __v)
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        return ret
      }
    }
  }
)

// Índice para búsquedas por prioridad y estado
tareaSchema.index({ prioridad: 1, completada: 1 })

module.exports = mongoose.model('Tarea', tareaSchema)
