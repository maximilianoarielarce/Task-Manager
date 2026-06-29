# Task Manager — Backend

API REST construida con **Node.js + Express + MongoDB (Mongoose)**.

## Estructura del proyecto

```
task-manager-backend/
├── src/
│   ├── config/
│   │   └── database.js          ← conexión a MongoDB
│   ├── controllers/
│   │   └── tareas.controller.js ← lógica del CRUD
│   ├── middlewares/
│   │   ├── errorHandler.js      ← manejo de errores global
│   │   └── validarTarea.js      ← validación de inputs
│   ├── models/
│   │   └── Tarea.model.js       ← esquema Mongoose
│   └── routes/
│       └── tareas.routes.js     ← definición de endpoints
├── index.js                     ← entrada del servidor
├── .env.example                 ← variables de entorno
└── package.json
```

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env
cp .env.example .env
# Editá el .env con tu URI de MongoDB

# 3. Iniciar en desarrollo
npm run dev

# 4. Iniciar en producción
npm start
```

## Variables de entorno

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-manager
NODE_ENV=development
```

## Endpoints

| Método | Ruta                      | Descripción                        |
|--------|---------------------------|------------------------------------|
| GET    | /api/tareas               | Obtener todas las tareas           |
| GET    | /api/tareas?prioridad=alta| Filtrar por prioridad              |
| GET    | /api/tareas?completada=true| Filtrar por estado                |
| GET    | /api/tareas/:id           | Obtener una tarea por ID           |
| POST   | /api/tareas               | Crear nueva tarea                  |
| PUT    | /api/tareas/:id           | Actualizar tarea completa          |
| PATCH  | /api/tareas/:id/toggle    | Cambiar estado completada/pendiente|
| DELETE | /api/tareas/:id           | Eliminar tarea                     |

## Ejemplo de body para POST/PUT

```json
{
  "nombre": "Implementar autenticación",
  "descripcion": "JWT con refresh tokens",
  "prioridad": "alta"
}
```

## Ejemplo de respuesta

```json
{
  "ok": true,
  "message": "Tarea creada correctamente",
  "data": {
    "id": "665f1a2b3c4d5e6f7a8b9c0d",
    "nombre": "Implementar autenticación",
    "descripcion": "JWT con refresh tokens",
    "prioridad": "alta",
    "completada": false,
    "createdAt": "2025-05-12T10:30:00.000Z",
    "updatedAt": "2025-05-12T10:30:00.000Z"
  }
}
```
