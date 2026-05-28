import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { legalNav, legalPages } from './legalContent'
import './legal.css'

/**
 * Page légale générique (mentions légales, RGPD, cookies, etc.).
 * Le contenu est piloté par le slug d'URL et la table `legalPages`.
 * Une nav latérale permet de passer d'une page légale à l'autre.
 */
export default function LegalPage() {
  const { slug } = useParams()
  const page = legalPages[slug]

  // Remonte en haut à chaque changement de page (sinon on garde le scroll précédent).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Met à jour le titre de l'onglet pour aider à la navigation et au SEO basique.
  useEffect(() => {
    if (!page) return
    const previous = document.title
    document.title = `${page.title} — TESSIPI Foundation`
    return () => {
      document.title = previous
    }
  }, [page])

  if (!page) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="legal-shell">
      <header className="legal-header">
        <div className="container legal-header-inner">
          <Link to="/" className="legal-brand">
            <img src="/images/logo.svg" alt="TESSIPI Foundation" />
          </Link>
          <Link to="/" className="legal-back">
            <i className="fas fa-arrow-left" aria-hidden="true"></i>
            <span>Retour au site</span>
          </Link>
        </div>
      </header>

      <main className="legal-main">
        <div className="container legal-grid">
          <aside className="legal-aside" aria-label="Pages légales">
            <h2>Informations légales</h2>
            <ul>
              {legalNav.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/legal/${item.slug}`}
                    className={item.slug === slug ? 'is-active' : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <article className="legal-article">
            <header className="legal-article-head">
              <p className="legal-eyebrow">Informations légales</p>
              <h1>{page.title}</h1>
              {page.intro && <p className="legal-intro">{page.intro}</p>}
            </header>

            {page.sections.map((section, idx) => (
              <section key={idx} className="legal-section">
                <h2>{section.heading}</h2>
                {section.body?.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.after?.map((paragraph, i) => (
                  <p key={`after-${i}`}>{paragraph}</p>
                ))}
              </section>
            ))}

            <p className="legal-updated">
              Dernière mise à jour : mai 2026.
            </p>
          </article>
        </div>
      </main>

      <footer className="legal-footnav">
        <div className="container legal-footnav-inner">
          <p>&copy; 2026 TESSIPI Foundation. Tous droits réservés.</p>
          <div className="legal-footnav-links">
            {legalNav.map((item) => (
              <Link key={item.slug} to={`/legal/${item.slug}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
