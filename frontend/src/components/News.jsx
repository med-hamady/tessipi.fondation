import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import { useContent } from '../data/content'
import { fetchNews } from '../api'

export default function News() {
  const { t, i18n } = useTranslation()
  const { news: fallbackNews } = useContent()
  // Actualités pilotées par l'admin ; null tant que l'API n'a rien renvoyé.
  const [apiNews, setApiNews] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchNews(i18n.language)
      .then((data) => {
        if (!cancelled) setApiNews(data.length ? data : null)
      })
      .catch(() => {
        // API injoignable : on retombe sur le contenu statique (traduit).
        if (!cancelled) setApiNews(null)
      })
    return () => {
      cancelled = true
    }
  }, [i18n.language])

  // Le repli suit toujours la langue courante (fallbackNews est réactif).
  const news = apiNews ?? fallbackNews

  // Traduit le badge de catégorie à partir de sa valeur (enum), avec repli.
  const categoryLabel = (item) =>
    t(`news.categories.${item.category}`, { defaultValue: item.category_display ?? item.category })

  return (
    <section id="actualites" className="news-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('news.label')}</span>
          <h2 className="section-title">{t('news.title')}</h2>
          <a href="#" className="link-arrow">{t('news.viewAll')} <i className="fas fa-arrow-right"></i></a>
        </div>

        <div className="news-grid">
          {news.map((item, i) => (
            <Reveal as="article" className="news-card" index={i} key={item.id ?? item.title}>
              <div className="news-image">
                <img src={item.image} alt={item.alt} />
                <span className="news-category">{categoryLabel(item)}</span>
              </div>
              <div className="news-content">
                <h3 className="news-title">{item.title}</h3>
                <p className="news-excerpt">{item.excerpt}</p>
                <div className="news-footer">
                  <span className="news-date"><i className="far fa-calendar"></i> {item.date}</span>
                  <a href="#" className="link-arrow">{t('news.read')}</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
