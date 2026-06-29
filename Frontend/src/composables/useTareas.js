import { ref, computed } from 'vue'
import { tareasService } from '../services/tareas.service'

// Composable: encapsula toda la lógica de tareas
// Los componentes solo llaman estas funciones, no manejan el estado directamente
export function useTareas() {
  // ─── ESTADO ─────────────────────────────────────────────
  const tareas = ref([])
  const cargando = ref(false)
  const error = ref(null)
  const filtroActivo = ref('todas')
  const tareaEditando = ref(null)

  // ─── COMPUTED ───────────────────────────────────────────
  const pendientes = computed(
    () => tareas.value.filter(t => !t.completada).length
  )

  const completadas = computed(
    () => tareas.value.filter(t => t.completada).length
  )

  const tareasFiltradas = computed(() => {
    switch (filtroActivo.value) {
      case 'pendientes':  return tareas.value.filter(t => !t.completada)
      case 'completadas': return tareas.value.filter(t => t.completada)
      case 'alta':        return tareas.value.filter(t => t.prioridad === 'alta')
      case 'media':       return tareas.value.filter(t => t.prioridad === 'media')
      case 'baja':        return tareas.value.filter(t => t.prioridad === 'baja')
      default:            return tareas.value
    }
  })

  // ─── MÉTODOS ────────────────────────────────────────────
  async function cargarTareas() {
    cargando.value = true
    error.value = null
    try {
      const res = await tareasService.getAll()
      tareas.value = res.data
    } catch (err) {
      error.value = err.message
    } finally {
      cargando.value = false
    }
  }

  async function agregarTarea(nueva) {
    try {
      const res = await tareasService.create(nueva)
      tareas.value.unshift(res.data) // agrega al principio de la lista
    } catch (err) {
      error.value = err.message
    }
  }

  async function actualizarTarea(id, datos) {
    try {
      const res = await tareasService.update(id, datos)
      const index = tareas.value.findIndex(t => t.id === id)
      if (index !== -1) tareas.value[index] = res.data
      tareaEditando.value = null
    } catch (err) {
      error.value = err.message
    }
  }

  async function toggleTarea(id) {
    try {
      const res = await tareasService.toggle(id)
      const index = tareas.value.findIndex(t => t.id === id)
      if (index !== -1) tareas.value[index] = res.data
    } catch (err) {
      error.value = err.message
    }
  }

  async function eliminarTarea(id) {
    try {
      await tareasService.remove(id)
      tareas.value = tareas.value.filter(t => t.id !== id)
    } catch (err) {
      error.value = err.message
    }
  }

  function abrirEditar(tarea) {
    tareaEditando.value = { ...tarea } // copia para no mutar el original
  }

  function cerrarEditar() {
    tareaEditando.value = null
  }

  return {
    // Estado
    tareas,
    cargando,
    error,
    filtroActivo,
    tareaEditando,
    // Computed
    pendientes,
    completadas,
    tareasFiltradas,
    // Métodos
    cargarTareas,
    agregarTarea,
    actualizarTarea,
    toggleTarea,
    eliminarTarea,
    abrirEditar,
    cerrarEditar
  }
}
