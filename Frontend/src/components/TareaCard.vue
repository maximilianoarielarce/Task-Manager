<script setup>
// defineProps tipado — buena práctica para entrevistas
const props = defineProps({
  tarea: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'editar', 'eliminar'])

function formatFecha(fechaISO) {
  return new Date(fechaISO).toLocaleDateString('es-AR')
}
</script>

<template>
  <div class="task-card" :class="{ done: tarea.completada }">
    <!-- Checkbox -->
    <div
      class="task-check"
      :class="{ checked: tarea.completada }"
      @click="emit('toggle', tarea.id)"
    />

    <!-- Contenido -->
    <div class="task-body">
      <div class="task-name">{{ tarea.nombre }}</div>
      <div class="task-desc" v-if="tarea.descripcion">
        {{ tarea.descripcion }}
      </div>
      <div class="task-meta">
        <span class="badge" :class="`badge-${tarea.prioridad}`">
          {{ tarea.prioridad }}
        </span>
        <span class="task-date">{{ formatFecha(tarea.createdAt) }}</span>
      </div>
    </div>

    <!-- Acciones -->
    <div class="task-actions">
      <button class="btn btn-edit" @click="emit('editar', tarea)">
        editar
      </button>
      <button class="btn btn-danger" @click="emit('eliminar', tarea.id)">
        eliminar
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  transition: border-color 0.2s, transform 0.15s;
  animation: fadeIn 0.25s ease;
}
.task-card:hover { border-color: #3e3e3e; transform: translateY(-1px); }
.task-card.done { opacity: 0.5; }

.task-check {
  width: 20px; height: 20px;
  border: 2px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 2px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.task-check.checked {
  background: var(--accent);
  border-color: var(--accent);
}
.task-check.checked::after {
  content: '✓';
  font-size: 12px;
  color: #000;
  font-weight: 800;
}

.task-body { flex: 1; min-width: 0; }
.task-name { font-weight: 700; font-size: 0.95rem; margin-bottom: 4px; }
.task-card.done .task-name { text-decoration: line-through; }
.task-desc {
  font-size: 0.8rem;
  color: var(--muted);
  margin-bottom: 8px;
  line-height: 1.5;
}
.task-meta { display: flex; align-items: center; gap: 8px; }

.badge {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 500;
}
.badge-alta  { background: rgba(255,68,68,0.15);   color: #ff6b6b; }
.badge-media { background: rgba(255,165,0,0.15);   color: #ffaa44; }
.badge-baja  { background: rgba(100,200,100,0.15); color: #6dcc6d; }

.task-date {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  color: var(--muted);
  margin-left: auto;
}
.task-actions { display: flex; gap: 4px; flex-shrink: 0; }
</style>
