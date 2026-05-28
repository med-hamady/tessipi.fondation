import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { submitForm } from '../api'
import { useToast } from '../context/ToastContext'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { t } = useTranslation()
  const showToast = useToast()
  const [form, setForm] = useState(EMPTY)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      showToast(t('contact.toast.required'), 'error')
      return
    }
    try {
      await submitForm(form, 'contact')
      showToast(t('contact.toast.success'), 'success')
      setForm(EMPTY)
    } catch {
      showToast(t('contact.toast.error'), 'error')
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-label">{t('contact.label')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-description">{t('contact.description')}</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
              <div className="contact-details">
                <h4>{t('contact.address')}</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{t('contact.addressValue')}</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-envelope"></i></div>
              <div className="contact-details">
                <h4>{t('contact.email')}</h4>
                <a href="mailto:contact@tessipi.org">contact@tessipi.org</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-phone"></i></div>
              <div className="contact-details">
                <h4>{t('contact.phone')}</h4>
                <a href="tel:+33123456789">+33 1 23 45 67 89</a>
              </div>
            </div>

            <div className="contact-social">
              <h4>{t('contact.social')}</h4>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>

          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('contact.form.name')}</label>
                <input type="text" id="name" name="name" placeholder={t('contact.form.namePh')} value={form.name} onChange={update} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('contact.form.email')}</label>
                <input type="email" id="email" name="email" placeholder={t('contact.form.emailPh')} value={form.email} onChange={update} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">{t('contact.form.subject')}</label>
              <input type="text" id="subject" name="subject" placeholder={t('contact.form.subjectPh')} value={form.subject} onChange={update} required />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.form.message')}</label>
              <textarea id="message" name="message" rows="5" placeholder={t('contact.form.messagePh')} value={form.message} onChange={update} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-submit">
              {t('contact.form.submit')}
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
