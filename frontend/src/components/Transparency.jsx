import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import { useContent } from '../data/content'

export default function Transparency() {
  const { t } = useTranslation()
  const { transparencyCards, transparencyStats } = useContent()

  return (
    <section id="transparence" className="transparency-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-label">{t('transparency.label')}</span>
          <h2 className="section-title">{t('transparency.title')}</h2>
          <p className="section-description">{t('transparency.description')}</p>
        </div>

        <div className="transparency-grid">
          {transparencyCards.map((card, i) => (
            <Reveal as="div" className="transparency-card" index={i} key={card.title}>
              <div className="transparency-icon">
                <i className={`fas ${card.icon}`}></i>
              </div>
              <h3 className="transparency-title">{card.title}</h3>
              <p className="transparency-description">{card.description}</p>
              <a href="#" className="link-arrow">{card.link} <i className="fas fa-arrow-right"></i></a>
            </Reveal>
          ))}
        </div>

        <div className="transparency-stats">
          {transparencyStats.map((stat) => (
            <div className="transparency-stat" key={stat.label}>
              <span className={stat.rating ? 'transparency-rating' : 'transparency-number'}>{stat.value}</span>
              <span className="transparency-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
