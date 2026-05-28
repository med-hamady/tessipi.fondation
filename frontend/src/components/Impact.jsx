import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import Counter from './Counter'
import { useContent } from '../data/content'
import { fetchStats } from '../api'

export default function Impact() {
  const { t, i18n } = useTranslation()
  const { impactItems: fallbackItems } = useContent()
  // Chiffres pilotés par l'admin ; null tant que l'API n'a rien renvoyé.
  const [apiItems, setApiItems] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchStats(i18n.language)
      .then((data) => {
        if (!cancelled) setApiItems(data.length ? data : null)
      })
      .catch(() => {
        // API injoignable : on retombe sur le contenu statique (traduit).
        if (!cancelled) setApiItems(null)
      })
    return () => {
      cancelled = true
    }
  }, [i18n.language])

  // Le repli suit toujours la langue courante (fallbackItems est réactif).
  const impactItems = apiItems ?? fallbackItems

  return (
    <section className="impact-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-label">{t('impact.label')}</span>
          <h2 className="section-title">{t('impact.title')}</h2>
          <p className="section-description">{t('impact.description')}</p>
        </div>

        <div className="impact-grid">
          {impactItems.map((item, i) => (
            <Reveal as="div" className="impact-item" index={i} key={item.id ?? item.label}>
              <div className="impact-icon">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <Counter target={item.target} className="impact-number" />
              {item.suffix && <span className="impact-suffix">{item.suffix}</span>}
              <span className="impact-label">{item.label}</span>
              <span className="impact-sublabel">{item.sublabel}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
