<script setup>
import { onMounted } from 'vue'
import TareaForm from './components/TareaForm.vue'
import TareaFiltros from './components/TareaFiltros.vue'
import TareaCard from './components/TareaCard.vue'
import { useTareas } from './composables/useTareas'

const {
  cargando,
  error,
  filtroActivo,
  tareaEditando,
  pendientes,
  completadas,
  tareasFiltradas,
  cargarTareas,
  agregarTarea,
  actualizarTarea,
  toggleTarea,
  eliminarTarea,
  abrirEditar,
  cerrarEditar
} = useTareas()

// onMounted: ciclo de vida — se ejecuta cuando el componente se monta
onMounted(() => {
  cargarTareas()
})
</script>

<template>
  <div class="app">
    <!-- HEADER -->
    <header class="header">
      <div class="header-top">
        <div class="header-dot" />
        <h1>Task Manager</h1>
      </div>
      <p class="header-sub">// vue 3 · composition api · node.js · mongodb</p>
    </header>

    <!-- STATS -->
    <div class="stats">
      <div class="stat">
        <div class="stat-num">{{ tareasFiltradas.length }}</div>
        <div class="stat-label">total</div>
      </div>
      <div class="stat">
        <div class="stat-num">{{ pendientes }}</div>
        <div class="stat-label">pendientes</div>
      </div>
      <div class="stat">
        <div class="stat-num">{{ completadas }}</div>
        <div class="stat-label">completadas</div>
      </div>
    </div>

    <!-- ERROR -->
    <div class="error-msg" v-if="error">
      ⚠ {{ error }}
    </div>

    <!-- FORMULARIO AGREGAR -->
    <TareaForm @submit="agregarTarea" />

    <!-- FILTROS -->
    <TareaFiltros
      :filtroActivo="filtroActivo"
      @cambiar="filtroActivo = $event"
    />

    <!-- LISTA -->
    <div v-if="cargando" class="empty">// cargando tareas...</div>

    <div v-else-if="tareasFiltradas.length === 0" class="empty">
      // no hay tareas para mostrar
    </div>

    <div v-else class="task-list">
      <TareaCard
        v-for="tarea in tareasFiltradas"
        :key="tarea.id"
        :tarea="tarea"
        @toggle="toggleTarea"
        @editar="abrirEditar"
        @eliminar="eliminarTarea"
      />
    </div>

    <!-- MODAL EDITAR -->
    <div class="modal-overlay" v-if="tareaEditando" @click.self="cerrarEditar">
      <div class="modal">
        <div class="modal-title">Editar <span>tarea</span></div>

        <div class="form-group">
          <label>nombre *</label>
          <input type="text" v-model="tareaEditando.nombre" />
        </div>

        <div class="form-group">
          <label>prioridad</label>
          <select v-model="tareaEditando.prioridad">
            <option value="baja">🟢 Baja</option>
            <option value="media">🟡 Media</option>
            <option value="alta">🔴 Alta</option>
          </select>
        </div>

        <div class="form-group">
          <label>descripción</label>
          <textarea v-model="tareaEditando.descripcion" />
        </div>

        <div class="modal-actions">
          <button
            class="btn btn-primary"
            @click="actualizarTarea(tareaEditando.id, tareaEditando)"
          >
            Guardar cambios
          </button>
          <button class="btn btn-secondary" @click="cerrarEditar">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app { max-width: 720px; margin: 0 auto; }

.header { margin-bottom: 40px; }
.header-top {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 6px;
}
.header-dot {
  width: 12px; height: 12px;
  background: var(--accent);
  border-radius: 50%;
  animation: pulse 2s infinite;
}
h1 { font-size: 2rem; font-weight: 800; letter-spacing: -0.5px; }
.header-sub {
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  color: var(--muted);
  margin-left: 26px;
}

.stats { display: flex; gap: 12px; margin-bottom: 28px; }
.stat {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px 18px;
  flex: 1;
  text-align: center;
}
.stat-num { font-size: 1.6rem; font-weight: 800; color: var(--accent); line-height: 1; }
.stat-label { font-size: 0.7rem; color: var(--muted); font-family: 'DM Mono', monospace; margin-top: 4px; }

.error-msg {
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid var(--danger);
  color: #ff6b6b;
  border-radius: var(--radius);
  padding: 12px 16px;
  margin-bottom: 16px;
  font-size: 0.85rem;
  font-family: 'DM Mono', monospace;
}

.empty {
  text-align: center;
  padding: 50px 20px;
  color: var(--muted);
  font-family: 'DM Mono', monospace;
  font-size: 0.85rem;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}

.task-list { display: flex; flex-direction: column; gap: 10px; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}
.modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 28px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.modal-title { font-size: 1.1rem; font-weight: 800; }
.modal-title span { color: var(--accent); }
.modal-actions { display: flex; gap: 10px; margin-top: 6px; }

.form-group { display: flex; flex-direction: column; gap: 6px; }
</style>
