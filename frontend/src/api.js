/**
 * Soumission des formulaires vers l'API Django (DRF).
 *
 * Endpoints : <BASE>/<type>/  (contact, newsletter, partners, volunteers, members…)
 *
 * Base de l'API :
 *  - En dev : non définie -> '/api', servi par le proxy Vite (vite.config.js).
 *  - En prod (Vercel) : définir VITE_API_URL avec l'URL du backend Hostinger,
 *    ex. https://api.mondomaine.com/api  (sans slash final).
 *
 * Pour revenir à un envoi simulé (sans backend), mettre USE_REAL_API à false.
 */

const USE_REAL_API = true

// Retire un éventuel slash final pour éviter les doubles slashes
const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

export async function submitForm(data, type) {
  if (!USE_REAL_API) {
    // Simulation d'un délai réseau
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Formulaire ${type} soumis:`, data)
        resolve({ success: true })
      }, 1000)
    })
  }

  const response = await fetch(`${API_BASE}/${type}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    // L'API renvoie {success:false, errors:[...]} ou {success:false, message:"..."}
    const detail = result.errors?.join(' ') || result.message || `Erreur API (${response.status})`
    throw new Error(detail)
  }
  return result
}

export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Lectures publiques des contenus pilotés par l'admin.
 * Chaque fonction renvoie un tableau ; en cas d'erreur réseau elle relaie
 * l'exception pour que l'appelant puisse retomber sur les données statiques.
 */
async function fetchList(path, lang) {
  const query = lang ? `?lang=${encodeURIComponent(lang)}` : ''
  const response = await fetch(`${API_BASE}/${path}/${query}`)
  if (!response.ok) throw new Error(`Erreur API (${response.status})`)
  const result = await response.json()
  return result.data || []
}

export const fetchActions = (lang) => fetchList('actions', lang)
export const fetchStats = (lang) => fetchList('stats', lang)
export const fetchNews = (lang) => fetchList('news', lang)

// Base utilisée aussi par le module d'administration (adminApi.js)
export { API_BASE }
