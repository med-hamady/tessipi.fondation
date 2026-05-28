import { useTranslation } from 'react-i18next'

export default function FloatingDonate() {
  const { t } = useTranslation()
  return (
    <a href="#don" className="floating-donate">
      <i className="fas fa-heart"></i>
      {t('floatingDonate')}
    </a>
  )
}
