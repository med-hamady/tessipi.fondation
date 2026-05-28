import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import { useContent } from '../data/content'

export default function About() {
  const { t } = useTranslation()
  const { values } = useContent()

  return (
    <section id="apropos" className="about-section">
      <div className="container">
        <div className="about-header">
          <span className="section-label">{t('about.label')}</span>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="about-description">{t('about.p1')}</p>
          <p className="about-description">{t('about.p2')}</p>
          <a href="#" className="link-arrow">{t('about.linkMore')} <i className="fas fa-arrow-right"></i></a>
        </div>

        <div className="values-grid">
          {values.map((value, i) => (
            <Reveal as="div" className="value-card" index={i} key={value.title}>
              <div className="value-icon">
                <i className={`fas ${value.icon}`}></i>
              </div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
