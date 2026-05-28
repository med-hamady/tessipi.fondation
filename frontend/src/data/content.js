/**
 * Contenu statique du site TESSIPI Foundation — version i18n.
 * Les libellés viennent des fichiers de traduction (`src/i18n/locales/*.json`)
 * via le hook `useContent()`. On ne garde ici que les données non-traduisibles
 * (icônes, images, ancres, montants de don).
 */
import { useTranslation } from 'react-i18next'

export const donationAmounts = [25, 50, 100, 250, 500]

export function useContent() {
  const { t } = useTranslation()

  const navLinks = [
    { href: '#accueil', label: t('nav.home') },
    { href: '#apropos', label: t('nav.about') },
    { href: '#actions', label: t('nav.actions') },
    { href: '#engager', label: t('nav.engage') },
    { href: '#transparence', label: t('nav.transparency') },
    { href: '#actualites', label: t('nav.news') },
    { href: '#contact', label: t('nav.contact') },
  ]

  const heroStats = [
    { target: 147000, suffix: 'K+', label: t('hero.stats.beneficiaries') },
    { target: 12, label: t('hero.stats.countries') },
    { target: 89, label: t('hero.stats.clinics') },
    { target: 2008, label: t('hero.stats.founded') },
  ]

  const values = [
    { icon: 'fa-heart', title: t('about.values.humanity.title'), description: t('about.values.humanity.description') },
    { icon: 'fa-shield-alt', title: t('about.values.protection.title'), description: t('about.values.protection.description') },
    { icon: 'fa-users', title: t('about.values.inclusion.title'), description: t('about.values.inclusion.description') },
    { icon: 'fa-hands-helping', title: t('about.values.solidarity.title'), description: t('about.values.solidarity.description') },
  ]

  const actionKeys = ['health', 'nutrition', 'education', 'protection', 'water', 'emergency']
  const actionImages = {
    health: '/images/asset_2.jpg',
    nutrition: '/images/asset_3.jpg',
    education: '/images/asset_4.jpg',
    protection: '/images/asset_5.jpg',
    water: '/images/asset_6.jpg',
    emergency: '/images/asset_7.jpg',
  }
  const actions = actionKeys.map((k) => ({
    image: actionImages[k],
    alt: t(`actions.items.${k}.alt`),
    badge: t(`actions.items.${k}.badge`),
    title: t(`actions.items.${k}.title`),
    description: t(`actions.items.${k}.description`),
  }))

  const engagements = [
    {
      icon: 'fa-heart',
      title: t('engage.items.donate.title'),
      description: t('engage.items.donate.description'),
      cta: { label: t('engage.items.donate.cta'), type: 'link', target: '#don' },
    },
    {
      icon: 'fa-handshake',
      title: t('engage.items.partner.title'),
      description: t('engage.items.partner.description'),
      cta: { label: t('engage.items.partner.cta'), type: 'modal', target: 'partner' },
    },
    {
      icon: 'fa-user-friends',
      title: t('engage.items.volunteer.title'),
      description: t('engage.items.volunteer.description'),
      cta: { label: t('engage.items.volunteer.cta'), type: 'modal', target: 'volunteer' },
    },
    {
      icon: 'fa-id-card',
      title: t('engage.items.member.title'),
      description: t('engage.items.member.description'),
      cta: { label: t('engage.items.member.cta'), type: 'modal', target: 'member' },
    },
  ]

  const transparencyCards = [
    { icon: 'fa-file-alt', title: t('transparency.cards.reports.title'), description: t('transparency.cards.reports.description'), link: t('transparency.cards.reports.link') },
    { icon: 'fa-chart-line', title: t('transparency.cards.financial.title'), description: t('transparency.cards.financial.description'), link: t('transparency.cards.financial.link') },
    { icon: 'fa-balance-scale', title: t('transparency.cards.ethics.title'), description: t('transparency.cards.ethics.description'), link: t('transparency.cards.ethics.link') },
    { icon: 'fa-user-shield', title: t('transparency.cards.safeguard.title'), description: t('transparency.cards.safeguard.description'), link: t('transparency.cards.safeguard.link') },
  ]

  const transparencyStats = [
    { value: '87%', label: t('transparency.stats.programs') },
    { value: '13%', label: t('transparency.stats.admin') },
    { value: '100%', label: t('transparency.stats.fiscal') },
    { value: 'A+', label: t('transparency.stats.rating'), rating: true },
  ]

  const newsMeta = {
    clinic: { image: '/images/asset_8.jpg', category: 'nouveau_projet' },
    training: { image: '/images/asset_9.jpg', category: 'evenement' },
    testimony: { image: '/images/asset_10.jpg', category: 'temoignage' },
  }
  const news = Object.entries(newsMeta).map(([k, meta]) => ({
    image: meta.image,
    category: meta.category,
    alt: t(`news.items.${k}.alt`),
    title: t(`news.items.${k}.title`),
    excerpt: t(`news.items.${k}.excerpt`),
    date: t(`news.items.${k}.date`),
  }))

  const impactItems = [
    { icon: 'fa-users', target: 147000, suffix: '+', label: t('impact.items.beneficiaries.label'), sublabel: t('impact.items.beneficiaries.sublabel') },
    { icon: 'fa-globe', target: 12, label: t('impact.items.countries.label'), sublabel: t('impact.items.countries.sublabel') },
    { icon: 'fa-hospital', target: 89, label: t('impact.items.clinics.label'), sublabel: t('impact.items.clinics.sublabel') },
    { icon: 'fa-calendar-alt', target: 18, label: t('impact.items.founded.label'), sublabel: t('impact.items.founded.sublabel') },
    { icon: 'fa-tint', target: 234, label: t('impact.items.water.label'), sublabel: t('impact.items.water.sublabel') },
    { icon: 'fa-graduation-cap', target: 45, label: t('impact.items.schools.label'), sublabel: t('impact.items.schools.sublabel') },
  ]

  const donationImpacts = {
    25: t('donation.impacts.25'),
    50: t('donation.impacts.50'),
    100: t('donation.impacts.100'),
    250: t('donation.impacts.250'),
    500: t('donation.impacts.500'),
  }

  return {
    navLinks,
    heroStats,
    values,
    actions,
    engagements,
    transparencyCards,
    transparencyStats,
    news,
    impactItems,
    donationImpacts,
  }
}
