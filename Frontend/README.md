# Task Manager — Frontend

Frontend construido con **Vue 3 + Vite** conectado al backend Node.js + Express + MongoDB.

## Estructura del proyecto

```
task-manager-frontend/
├── src/
│   ├── components/
│   │   ├── TareaCard.vue        ← tarjeta individual de tarea
│   │   ├── TareaFiltros.vue     ← botones de filtro
│   │   └── TareaForm.vue        ← formulario para agregar tareas
│   ├── composables/
│   │   └── useTareas.js         ← lógica reutilizable (Composition API)
│   ├── services/
│   │   └── tareas.service.js    ← llamadas HTTP al backend
│   ├── styles/
│   │   └── main.css             ← estilos globales
│   ├── App.vue                  ← componente raíz
│   └── main.js                  ← entrada de la app
├── index.html
├── vite.config.js               ← config Vite + proxy al backend
└── package.json
```

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en desarrollo (requiere el backend corriendo en :3000)
npm run dev

# 3. Build para producción
npm run build
```

## Conceptos Vue 3 utilizados

| Concepto | Dónde se usa |
|---|---|
| `<script setup>` | Todos los componentes |
| `ref` | Estado reactivo en useTareas.js |
| `computed` | Filtros, contadores en useTareas.js |
| `onMounted` | Carga inicial de tareas en App.vue |
| `defineProps` | TareaCard, TareaFiltros |
| `defineEmits` | TareaCard, TareaFiltros, TareaForm |
| `v-model` | Formularios |
| `v-for` / `v-if` | Listas y renderizado condicional |
| `:class` | Clases dinámicas en TareaCard |
| Composables | useTareas.js — lógica separada de la UI |
| Services | tareas.service.js — HTTP separado de la lógica |
