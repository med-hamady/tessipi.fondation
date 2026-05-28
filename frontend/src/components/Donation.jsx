import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { donationAmounts, useContent } from '../data/content'
import { useToast } from '../context/ToastContext'

export default function Donation() {
  const { t } = useTranslation()
  const { donationImpacts } = useContent()
  const showToast = useToast()
  const [type, setType] = useState('once')
  const [amount, setAmount] = useState(100)
  const [custom, setCustom] = useState('')

  const computeImpact = (a) => {
    let impact
    if (a <= 25) impact = donationImpacts[25]
    else if (a <= 50) impact = donationImpacts[50]
    else if (a <= 100) impact = donationImpacts[100]
    else if (a <= 250) impact = donationImpacts[250]
    else impact = donationImpacts[500]

    if (type === 'monthly') impact += ' ' + t('donation.perMonth')
    return impact
  }

  const selectAmount = (value) => {
    setAmount(value)
    setCustom('')
  }

  const onCustomChange = (e) => {
    const v = e.target.value
    setCustom(v)
    if (v) setAmount(parseInt(v, 10) || 0)
  }

  const handleDonate = () => {
    if (amount <= 0) {
      showToast(t('donation.errors.selectAmount'), 'error')
      return
    }
    const message =
      type === 'monthly'
        ? t('donation.success.monthly', { amount })
        : t('donation.success.once', { amount })
    showToast(message, 'success')
  }

  return (
    <section id="don" className="donation-section">
      <div className="container">
        <div className="donation-header">
          <h2 className="section-title">{t('donation.title')}</h2>
          <p className="section-subtitle">
            {t('donation.subtitle')}{' '}
            <span className="highlight-text">{t('donation.highlight')}</span>
          </p>
        </div>

        <div className="donation-card">
          <div className="donation-type">
            <button
              className={`type-btn${type === 'once' ? ' active' : ''}`}
              onClick={() => setType('once')}
            >
              {t('donation.once')}
            </button>
            <button
              className={`type-btn${type === 'monthly' ? ' active' : ''}`}
              onClick={() => setType('monthly')}
            >
              {t('donation.monthly')}
            </button>
          </div>

          <div className="donation-amounts">
            {donationAmounts.map((value) => (
              <button
                key={value}
                className={`amount-btn${amount === value && !custom ? ' active' : ''}`}
                onClick={() => selectAmount(value)}
              >
                {value}<span>€</span>
              </button>
            ))}
            <div className="custom-amount">
              <input
                type="number"
                id="customAmount"
                placeholder={t('donation.custom')}
                min="1"
                value={custom}
                onChange={onCustomChange}
              />
              <span className="currency">€</span>
            </div>
          </div>

          <div className="donation-impact">
            <div className="impact-icon">
              <i className="fas fa-heart"></i>
            </div>
            <div className="impact-text">
              <span className="impact-label">{t('donation.impactLabel')}</span>
              <span className="impact-value" id="impactValue">{computeImpact(amount)}</span>
            </div>
          </div>

          <button className="btn btn-primary btn-donate" id="donateBtn" onClick={handleDonate}>
            <i className="fas fa-heart"></i>
            {t('donation.cta')}
          </button>

          <p className="donation-note">
            <i className="fas fa-lock"></i>
            {t('donation.note')}
          </p>
        </div>
      </div>
    </section>
  )
}
