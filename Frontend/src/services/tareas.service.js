// Centraliza todas las llamadas HTTP al backend
// Si mañana cambia la URL base, solo se toca acá

const BASE_URL = '/api/tareas'

// Helper para manejar la respuesta y lanzar errores con mensaje claro
async function handleResponse(response) {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Error en la solicitud')
  }
  return data
}

export const tareasService = {
  // GET /api/tareas
  async getAll(filtros = {}) {
    const params = new URLSearchParams()
    if (filtros.prioridad) params.append('prioridad', filtros.prioridad)
    if (filtros.completada !== undefined) params.append('completada', filtros.completada)

    const query = params.toString() ? `?${params}` : ''
    const response = await fetch(`${BASE_URL}${query}`)
    return handleResponse(response)
  },

  // POST /api/tareas
  async create(tarea) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarea)
    })
    return handleResponse(response)
  },

  // PUT /api/tareas/:id
  async update(id, tarea) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarea)
    })
    return handleResponse(response)
  },

  // PATCH /api/tareas/:id/toggle
  async toggle(id) {
    const response = await fetch(`${BASE_URL}/${id}/toggle`, {
      method: 'PATCH'
    })
    return handleResponse(response)
  },

  // DELETE /api/tareas/:id
  async remove(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    })
    return handleResponse(response)
  }
}
