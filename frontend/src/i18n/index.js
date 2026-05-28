import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from './locales/fr.json'
import en from './locales/en.json'
import ar from './locales/ar.json'

export const SUPPORTED_LANGS = ['fr', 'en', 'ar']
export const RTL_LANGS = ['ar']
const STORAGE_KEY = 'tessipi-lang'

function getInitialLang() {
  if (typeof window === 'undefined') return 'fr'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored
  return 'fr'
}

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: getInitialLang(),
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
  returnNull: false,
})

function applyDocumentLang(lang) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lang
  document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr'
}

applyDocumentLang(i18n.language)

i18n.on('languageChanged', (lang) => {
  applyDocumentLang(lang)
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* localStorage indisponible (mode privé) */
  }
})

export default i18n
