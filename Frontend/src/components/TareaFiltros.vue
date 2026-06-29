<script setup>
// defineProps recibe datos del padre
// defineEmits emite eventos al padre
const props = defineProps({
  filtroActivo: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['cambiar'])

const filtros = [
  { label: 'Todas',       value: 'todas' },
  { label: 'Pendientes',  value: 'pendientes' },
  { label: 'Completadas', value: 'completadas' },
  { label: '🔴 Alta',     value: 'alta' },
  { label: '🟡 Media',    value: 'media' },
  { label: '🟢 Baja',     value: 'baja' },
]
</script>

<template>
  <div class="filtros">
    <button
      v-for="f in filtros"
      :key="f.value"
      class="filter-btn"
      :class="{ active: filtroActivo === f.value }"
      @click="emit('cambiar', f.value)"
    >
      {{ f.label }}
    </button>
  </div>
</template>

<style scoped>
.filtros {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.filter-btn {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.15s;
}
.filter-btn.active {
  background: var(--accent);
  color: #000;
  border-color: var(--accent);
  font-weight: 700;
}
.filter-btn:hover:not(.active) {
  border-color: var(--muted);
  color: var(--text);
}
</style>
