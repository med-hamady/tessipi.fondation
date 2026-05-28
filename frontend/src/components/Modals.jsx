import { useTranslation } from 'react-i18next'
import Modal from './Modal'
import { submitForm } from '../api'
import { useToast } from '../context/ToastContext'

/**
 * Les trois modales d'engagement (partenaire / bénévole / adhésion).
 * `active` vaut 'partner' | 'volunteer' | 'member' | null.
 */
export default function Modals({ active, onClose }) {
  const { t } = useTranslation()
  const showToast = useToast()

  const handleSubmit = (type, successMessage) => async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    try {
      await submitForm(data, type)
      showToast(successMessage, 'success')
      e.target.reset()
      onClose()
    } catch {
      showToast(t('modals.common.error'), 'error')
    }
  }

  return (
    <>
      <Modal
        open={active === 'partner'}
        onClose={onClose}
        title={t('modals.partner.title')}
        intro={t('modals.partner.intro')}
      >
        <form onSubmit={handleSubmit('partners', t('modals.partner.success'))}>
          <div className="form-group">
            <label>{t('modals.partner.organization')}</label>
            <input type="text" name="organization" required />
          </div>
          <div className="form-group">
            <label>{t('modals.partner.email')}</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>{t('modals.partner.type')}</label>
            <select name="partnership_type" required defaultValue="">
              <option value="">{t('common.select')}</option>
              <option value="financier">{t('modals.partner.options.financial')}</option>
              <option value="technique">{t('modals.partner.options.technical')}</option>
              <option value="media">{t('modals.partner.options.media')}</option>
              <option value="autre">{t('modals.partner.options.other')}</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">{t('modals.partner.submit')}</button>
        </form>
      </Modal>

      <Modal
        open={active === 'volunteer'}
        onClose={onClose}
        title={t('modals.volunteer.title')}
        intro={t('modals.volunteer.intro')}
      >
        <form onSubmit={handleSubmit('volunteers', t('modals.volunteer.success'))}>
          <div className="form-group">
            <label>{t('modals.volunteer.name')}</label>
            <input type="text" name="name" required />
          </div>
          <div className="form-group">
            <label>{t('modals.volunteer.email')}</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>{t('modals.volunteer.expertise')}</label>
            <select name="expertise" required defaultValue="">
              <option value="">{t('common.select')}</option>
              <option value="sante">{t('modals.volunteer.options.health')}</option>
              <option value="education">{t('modals.volunteer.options.education')}</option>
              <option value="admin">{t('modals.volunteer.options.admin')}</option>
              <option value="communication">{t('modals.volunteer.options.communication')}</option>
              <option value="autre">{t('modals.volunteer.options.other')}</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">{t('modals.volunteer.submit')}</button>
        </form>
      </Modal>

      <Modal
        open={active === 'member'}
        onClose={onClose}
        title={t('modals.member.title')}
        intro={t('modals.member.intro')}
      >
        <form onSubmit={handleSubmit('members', t('modals.member.success'))}>
          <div className="form-group">
            <label>{t('modals.member.name')}</label>
            <input type="text" name="name" required />
          </div>
          <div className="form-group">
            <label>{t('modals.member.email')}</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>{t('modals.member.phone')}</label>
            <input type="tel" name="phone" required />
          </div>
          <button type="submit" className="btn btn-primary">{t('modals.member.submit')}</button>
        </form>
      </Modal>
    </>
  )
}
