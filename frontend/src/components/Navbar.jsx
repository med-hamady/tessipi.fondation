import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContent } from '../data/content'

const LANGS = [
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'ar', flag: '🇸🇦', label: 'AR' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { navLinks } = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('accueil')
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
      let current = ''
      document.querySelectorAll('section[id]').forEach((section) => {
        const top = section.offsetTop - 100
        if (window.scrollY >= top && window.scrollY < top + section.offsetHeight) {
          current = section.getAttribute('id')
        }
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  // Ferme le dropdown langue au clic à l'extérieur.
  useEffect(() => {
    if (!langOpen) return
    function onDocClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [langOpen])

  const current = LANGS.find((l) => l.code === i18n.language) ?? LANGS[0]
  const changeLang = (code) => {
    i18n.changeLanguage(code)
    setLangOpen(false)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container nav-container">
        <a href="#accueil" className="logo">
          <img src="/images/logo.svg" alt="TESSIPI Foundation" />
        </a>

        <button
          className={`mobile-menu-btn${menuOpen ? ' active' : ''}`}
          id="mobileMenuBtn"
          aria-label="Menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu${menuOpen ? ' active' : ''}`} id="navMenu">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <div className={`lang-dropdown${langOpen ? ' open' : ''}`} ref={langRef}>
            <button
              type="button"
              className="lang-btn"
              id="langBtn"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={t('nav.language')}
              onClick={() => setLangOpen((o) => !o)}
            >
              <span className="flag">{current.flag}</span>
              <span>{current.label}</span>
              <i className={`fas fa-chevron-${langOpen ? 'up' : 'down'}`}></i>
            </button>
            {langOpen && (
              <ul className="lang-menu" role="listbox">
                {LANGS.map((l) => (
                  <li key={l.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={l.code === current.code}
                      className={`lang-option${l.code === current.code ? ' active' : ''}`}
                      onClick={() => changeLang(l.code)}
                    >
                      <span className="flag">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a href="#don" className="btn btn-primary">{t('nav.donate')}</a>
        </div>
      </div>
    </nav>
  )
}
