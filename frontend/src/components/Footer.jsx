import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { submitForm } from '../api'
import { useToast } from '../context/ToastContext'
import { useModal } from '../context/ModalContext'

export default function Footer() {
  const { t } = useTranslation()
  const showToast = useToast()
  const openModal = useModal()
  const [email, setEmail] = useState('')

  const handleNewsletter = async (e) => {
    e.preventDefault()
    if (!email) {
      showToast(t('footer.toast.required'), 'error')
      return
    }
    try {
      await submitForm({ email }, 'newsletter')
      showToast(t('footer.toast.success'), 'success')
      setEmail('')
    } catch {
      showToast(t('footer.toast.error'), 'error')
    }
  }

  const modalLink = (target) => (e) => {
    e.preventDefault()
    openModal(target)
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/images/logo.svg" alt="TESSIPI Foundation" className="footer-logo" />
            <p className="footer-tagline">{t('footer.tagline')}</p>

            <div className="newsletter">
              <h4>{t('footer.newsletter')}</h4>
              <p>{t('footer.newsletterIntro')}</p>
              <form className="newsletter-form" id="newsletterForm" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  placeholder={t('footer.newsletterPh')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" aria-label={t('footer.newsletterSubscribe')}>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>

          <div className="footer-links">
            <h4>{t('footer.about')}</h4>
            <ul>
              <li><a href="#apropos">{t('nav.about')}</a></li>
              <li><a href="#actions">{t('nav.actions')}</a></li>
              <li><a href="#transparence">{t('nav.transparency')}</a></li>
              <li><a href="#actualites">{t('nav.news')}</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>{t('footer.engage')}</h4>
            <ul>
              <li><a href="#don">{t('footer.donate')}</a></li>
              <li><a href="#" onClick={modalLink('partner')}>{t('footer.partner')}</a></li>
              <li><a href="#" onClick={modalLink('volunteer')}>{t('footer.volunteer')}</a></li>
              <li><a href="#" onClick={modalLink('member')}>{t('footer.member')}</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>{t('footer.contact')}</h4>
            <p style={{ whiteSpace: 'pre-line' }}>{t('contact.addressValue')}</p>
            <a href="mailto:contact@tessipi.org">contact@tessipi.org</a>
            <a href="tel:+33123456789">+33 1 23 45 67 89</a>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('footer.rights')}</p>
          <div className="footer-legal">
            <Link to="/legal/mentions-legales">{t('footer.legal.mentions')}</Link>
            <Link to="/legal/politique-confidentialite">{t('footer.legal.privacy')}</Link>
            <Link to="/legal/protection-donnees">{t('footer.legal.data')}</Link>
            <Link to="/legal/cookies">{t('footer.legal.cookies')}</Link>
            <Link to="/legal/transparence-financiere">{t('footer.legal.transparency')}</Link>
            <Link to="/legal/engagement-abus">{t('footer.legal.abuse')}</Link>
            <Link to="/legal/peas">{t('footer.legal.peas')}</Link>
            <Link to="/legal/signaler">{t('footer.legal.report')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
