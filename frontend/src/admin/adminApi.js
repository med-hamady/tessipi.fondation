/**
 * Couche d'accès à l'API d'administration (CRUD protégé par token DRF).
 * Le token est stocké dans localStorage et injecté en en-tête Authorization.
 */
import { API_BASE } from '../api'

const TOKEN_KEY = 'tessipi_admin_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Token ${token}`
  }

  const response = await fetch(`${API_BASE}/${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (response.status === 204) return null
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    if (response.status === 401) {
      // Token absent / expiré : on nettoie pour forcer une reconnexion.
      clearToken()
    }
    const detail =
      data.message ||
      (data.detail && String(data.detail)) ||
      flattenErrors(data) ||
      `Erreur API (${response.status})`
    const error = new Error(detail)
    error.status = response.status
    throw error
  }
  return data
}

// Aplatissement des erreurs de validation DRF ({champ: ["msg"]}) en une phrase.
function flattenErrors(data) {
  if (!data || typeof data !== 'object') return ''
  const parts = []
  for (const [key, value] of Object.entries(data)) {
    const msgs = Array.isArray(value) ? value.join(' ') : String(value)
    parts.push(key === 'non_field_errors' ? msgs : `${key}: ${msgs}`)
  }
  return parts.join(' • ')
}

// --- Téléversement d'image (multipart) ---
export async function uploadImage(file) {
  const token = getToken()
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE}/admin/upload/`, {
    method: 'POST',
    // Pas de Content-Type : le navigateur fixe le bon boundary multipart.
    headers: token ? { Authorization: `Token ${token}` } : {},
    body: formData,
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    if (response.status === 401) clearToken()
    throw new Error(data.message || `Échec du téléversement (${response.status})`)
  }
  return data.url
}

// --- Authentification ---
export async function login(username, password) {
  const data = await request('admin/login/', {
    method: 'POST',
    auth: false,
    body: { username, password },
  })
  setToken(data.token)
  return data.user
}

export async function fetchMe() {
  const data = await request('admin/me/')
  return data.user
}

export async function logout() {
  try {
    await request('admin/me/', { method: 'POST' })
  } catch {
    // On ignore : on supprime le token côté client dans tous les cas.
  }
  clearToken()
}

/**
 * Fabrique un jeu de fonctions CRUD pour une ressource d'administration.
 * resource ∈ { 'actions', 'news', 'stats' }
 */
function crud(resource) {
  const base = `admin/${resource}/`
  return {
    list: () => request(base),
    create: (payload) => request(base, { method: 'POST', body: payload }),
    update: (id, payload) => request(`${base}${id}/`, { method: 'PATCH', body: payload }),
    remove: (id) => request(`${base}${id}/`, { method: 'DELETE' }),
  }
}

export const actionsApi = crud('actions')
export const newsApi = crud('news')
export const statsApi = crud('stats')
