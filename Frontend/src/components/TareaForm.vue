<script setup>
import { ref } from 'vue'

// defineEmits declara los eventos que este componente puede emitir al padre
const emit = defineEmits(['submit'])

const form = ref({
  nombre: '',
  descripcion: '',
  prioridad: 'media'
})

function handleSubmit() {
  if (!form.value.nombre.trim()) return
  emit('submit', { ...form.value })
  limpiar()
}

function limpiar() {
  form.value = { nombre: '', descripcion: '', prioridad: 'media' }
}
</script>

<template>
  <div class="form-card">
    <div class="form-title">// nueva tarea</div>

    <div class="form-row">
      <div class="form-group">
        <label>nombre *</label>
        <input
          type="text"
          v-model="form.nombre"
          placeholder="Ej: Implementar login..."
          @keyup.enter="handleSubmit"
        />
      </div>
      <div class="form-group form-group--small">
        <label>prioridad</label>
        <select v-model="form.prioridad">
          <option value="baja">🟢 Baja</option>
          <option value="media">🟡 Media</option>
          <option value="alta">🔴 Alta</option>
        </select>
      </div>
    </div>

    <div class="form-group" style="margin-top: 10px">
      <label>descripción (opcional)</label>
      <textarea
        v-model="form.descripcion"
        placeholder="Detallá un poco más la tarea..."
      />
    </div>

    <div class="form-actions">
      <button class="btn btn-primary" @click="handleSubmit">
        + Agregar tarea
      </button>
      <button class="btn btn-secondary" @click="limpiar">Limpiar</button>
    </div>
  </div>
</template>

<style scoped>
.form-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  margin-bottom: 24px;
}
.form-title {
  font-size: 0.7rem;
  font-family: 'DM Mono', monospace;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 14px;
}
.form-row {
  display: flex;
  gap: 10px;
}
.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group--small { max-width: 140px; }
.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}
</style>
