import ResourceManager from './ResourceManager'
import { actionsApi, newsApi, statsApi } from './adminApi'

// Pastille oui/non pour la colonne « actif »
const boolPill = (val) => (
  <span className={`admin-pill ${val ? 'admin-pill-on' : 'admin-pill-off'}`}>
    {val ? 'Visible' : 'Masqué'}
  </span>
)

const thumb = (src) =>
  src ? <img className="admin-thumb" src={src} alt="" /> : <span className="admin-muted">—</span>

// ----------------------------- NOS ACTIONS -----------------------------
export function ActionsManager() {
  return (
    <ResourceManager
      title="Nos actions"
      description="Les programmes affichés dans la section « Nos actions » du site."
      api={actionsApi}
      itemLabel={(it) => it.title}
      columns={[
        { key: 'image', label: 'Image', render: (it) => thumb(it.image) },
        { key: 'title', label: 'Titre' },
        { key: 'badge', label: 'Badge' },
        { key: 'display_order', label: 'Ordre' },
        { key: 'is_active', label: 'État', render: (it) => boolPill(it.is_active) },
      ]}
      makeEmpty={() => ({
        title: '', title_en: '', title_ar: '',
        badge: '', badge_en: '', badge_ar: '',
        image: '',
        alt: '', alt_en: '', alt_ar: '',
        description: '', description_en: '', description_ar: '',
        display_order: 0,
        is_active: true,
      })}
      fields={[
        { name: 'title', label: 'Titre (FR)', required: true },
        { name: 'title_en', label: 'Titre (EN)', help: 'Laisser vide pour réutiliser le français.' },
        { name: 'title_ar', label: 'Titre (AR)', dir: 'rtl', help: 'Laisser vide pour réutiliser le français.' },
        { name: 'badge', label: 'Badge (FR)', placeholder: 'ex. 147K+ bénéficiaires' },
        { name: 'badge_en', label: 'Badge (EN)' },
        { name: 'badge_ar', label: 'Badge (AR)', dir: 'rtl' },
        {
          name: 'image',
          label: 'Image',
          type: 'image',
          placeholder: '/images/asset_2.jpg',
          help: 'Téléversez un fichier ou saisissez un chemin (/images/…) ou une URL.',
        },
        { name: 'alt', label: "Texte alternatif (FR)" },
        { name: 'alt_en', label: "Texte alternatif (EN)" },
        { name: 'alt_ar', label: "Texte alternatif (AR)", dir: 'rtl' },
        { name: 'description', label: 'Description (FR)', type: 'textarea', required: true },
        { name: 'description_en', label: 'Description (EN)', type: 'textarea' },
        { name: 'description_ar', label: 'Description (AR)', type: 'textarea', dir: 'rtl' },
        { name: 'display_order', label: "Ordre d'affichage", type: 'number' },
        { name: 'is_active', label: 'Visible sur le site', type: 'checkbox' },
      ]}
    />
  )
}

// ----------------------------- ACTUALITÉS -----------------------------
const NEWS_CATEGORIES = [
  { value: 'nouveau_projet', label: 'Nouveau projet' },
  { value: 'evenement', label: 'Événement' },
  { value: 'temoignage', label: 'Témoignage' },
  { value: 'rapport', label: 'Rapport' },
  { value: 'autre', label: 'Autre' },
]
const NEWS_STATUS = [
  { value: 'draft', label: 'Brouillon' },
  { value: 'published', label: 'Publié' },
  { value: 'archived', label: 'Archivé' },
]

export function NewsManager() {
  return (
    <ResourceManager
      title="Actualités"
      description="Les articles affichés dans la section « Actualités ». Seuls les articles « Publié » apparaissent sur le site."
      api={newsApi}
      itemLabel={(it) => it.title}
      columns={[
        { key: 'image', label: 'Image', render: (it) => thumb(it.image) },
        { key: 'title', label: 'Titre' },
        { key: 'category_display', label: 'Catégorie' },
        {
          key: 'status',
          label: 'Statut',
          render: (it) => (
            <span className={`admin-pill ${it.status === 'published' ? 'admin-pill-on' : 'admin-pill-off'}`}>
              {it.status_display}
            </span>
          ),
        },
      ]}
      makeEmpty={() => ({
        title: '', title_en: '', title_ar: '',
        category: 'nouveau_projet',
        status: 'draft',
        image: '',
        excerpt: '', excerpt_en: '', excerpt_ar: '',
        content: '', content_en: '', content_ar: '',
        author: 'Équipe TESSIPI',
        published_at: '',
      })}
      fields={[
        { name: 'title', label: 'Titre (FR)', required: true },
        { name: 'title_en', label: 'Titre (EN)', help: 'Laisser vide pour réutiliser le français.' },
        { name: 'title_ar', label: 'Titre (AR)', dir: 'rtl', help: 'Laisser vide pour réutiliser le français.' },
        { name: 'category', label: 'Catégorie', type: 'select', options: NEWS_CATEGORIES },
        { name: 'status', label: 'Statut', type: 'select', options: NEWS_STATUS },
        {
          name: 'image',
          label: 'Image',
          type: 'image',
          placeholder: '/images/asset_8.jpg',
          help: 'Téléversez un fichier ou saisissez un chemin (/images/…) ou une URL.',
        },
        { name: 'excerpt', label: 'Extrait (FR)', type: 'textarea' },
        { name: 'excerpt_en', label: 'Extrait (EN)', type: 'textarea' },
        { name: 'excerpt_ar', label: 'Extrait (AR)', type: 'textarea', dir: 'rtl' },
        { name: 'content', label: 'Contenu complet (FR)', type: 'textarea' },
        { name: 'content_en', label: 'Contenu complet (EN)', type: 'textarea' },
        { name: 'content_ar', label: 'Contenu complet (AR)', type: 'textarea', dir: 'rtl' },
        { name: 'author', label: 'Auteur' },
        {
          name: 'published_at',
          label: 'Date de publication',
          type: 'datetime',
          help: 'Laisser vide pour un brouillon non daté.',
        },
      ]}
    />
  )
}

// ----------------------------- NOTRE IMPACT -----------------------------
export function StatsManager() {
  return (
    <ResourceManager
      title="Notre impact"
      description="Les chiffres clés affichés dans la section « Notre impact »."
      api={statsApi}
      itemLabel={(it) => it.stat_label}
      columns={[
        {
          key: 'icon',
          label: 'Icône',
          render: (it) => <i className={`fas ${it.icon}`} title={it.icon}></i>,
        },
        { key: 'stat_label', label: 'Libellé' },
        {
          key: 'stat_value',
          label: 'Valeur',
          render: (it) => `${it.stat_value}${it.suffix || ''}`,
        },
        { key: 'display_order', label: 'Ordre' },
        { key: 'is_active', label: 'État', render: (it) => boolPill(it.is_active) },
      ]}
      makeEmpty={() => ({
        stat_key: '',
        stat_label: '', stat_label_en: '', stat_label_ar: '',
        stat_value: 0,
        suffix: '',
        icon: 'fa-chart-bar',
        description: '', description_en: '', description_ar: '',
        display_order: 0,
        is_active: true,
      })}
      fields={[
        { name: 'stat_label', label: 'Libellé (FR)', placeholder: 'ex. Bénéficiaires', required: true },
        { name: 'stat_label_en', label: 'Libellé (EN)', help: 'Laisser vide pour réutiliser le français.' },
        { name: 'stat_label_ar', label: 'Libellé (AR)', dir: 'rtl', help: 'Laisser vide pour réutiliser le français.' },
        { name: 'stat_value', label: 'Valeur (nombre)', type: 'number', required: true },
        { name: 'suffix', label: 'Suffixe', placeholder: 'ex. + ou K+' },
        { name: 'description', label: 'Sous-libellé (FR)', placeholder: 'ex. Personnes aidées' },
        { name: 'description_en', label: 'Sous-libellé (EN)' },
        { name: 'description_ar', label: 'Sous-libellé (AR)', dir: 'rtl' },
        {
          name: 'icon',
          label: 'Icône (Font Awesome)',
          placeholder: 'fa-users',
          help: "Nom de classe Font Awesome, ex. fa-users, fa-globe, fa-hospital.",
        },
        {
          name: 'stat_key',
          label: 'Clé technique',
          placeholder: 'ex. beneficiaries',
          help: 'Identifiant unique en minuscules (sans espaces). À définir une seule fois.',
          required: true,
        },
        { name: 'display_order', label: "Ordre d'affichage", type: 'number' },
        { name: 'is_active', label: 'Visible sur le site', type: 'checkbox' },
      ]}
    />
  )
}
