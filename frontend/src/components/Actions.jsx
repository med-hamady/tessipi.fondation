import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import { useContent } from '../data/content'
import { fetchActions } from '../api'

export default function Actions() {
  const { t, i18n } = useTranslation()
  const { actions: fallbackActions } = useContent()
  // Données pilotées par l'admin ; null tant que l'API n'a rien renvoyé.
  const [apiActions, setApiActions] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchActions(i18n.language)
      .then((data) => {
        if (!cancelled) setApiActions(data.length ? data : null)
      })
      .catch(() => {
        // API injoignable : on retombe sur le contenu statique (traduit).
        if (!cancelled) setApiActions(null)
      })
    return () => {
      cancelled = true
    }
  }, [i18n.language])

  // Le repli suit toujours la langue courante (fallbackActions est réactif).
  const actions = apiActions ?? fallbackActions

  return (
    <section id="actions" className="actions-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('actions.label')}</span>
          <h2 className="section-title">{t('actions.title')}</h2>
          <p className="section-description">{t('actions.description')}</p>
        </div>

        <div className="actions-grid">
          {actions.map((action, i) => (
            <Reveal as="div" className="action-card" index={i} key={action.id ?? action.title}>
              <div className="action-image">
                <img src={action.image} alt={action.alt} />
                <span className="action-badge">{action.badge}</span>
              </div>
              <div className="action-content">
                <h3 className="action-title">{action.title}</h3>
                <p className="action-description">{action.description}</p>
                <a href="#" className="link-arrow">{t('common.learnMore')} <i className="fas fa-arrow-right"></i></a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
