import { useTranslation } from 'react-i18next'
import Counter from './Counter'
import { useContent } from '../data/content'

export default function Hero() {
  const { t } = useTranslation()
  const { heroStats } = useContent()

  return (
    <section id="accueil" className="hero">
      <div className="hero-background">
        <img src="/images/asset_1.jpg" alt="Enfant souriant" />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-text">
          <span className="hero-label">{t('hero.label')}</span>
          <h1 className="hero-title">
            {t('hero.title1')}<br />
            <span className="highlight">{t('hero.title2')}</span><br />
            {t('hero.title3')}
          </h1>
          <p className="hero-description">{t('hero.description')}</p>
          <div className="hero-buttons">
            <a href="#don" className="btn btn-primary btn-large">
              {t('hero.ctaDonate')}
              <i className="fas fa-arrow-right"></i>
            </a>
            <a href="#actions" className="btn btn-outline btn-large">
              {t('hero.ctaActions')}
            </a>
          </div>
        </div>

        <div className="hero-stats">
          {heroStats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <Counter target={stat.target} className="stat-number" />
              {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="#don" className="scroll-indicator">
        <i className="fas fa-chevron-down"></i>
      </a>
    </section>
  )
}
