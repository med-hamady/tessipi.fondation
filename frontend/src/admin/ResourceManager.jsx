import { useEffect, useMemo, useRef, useState } from 'react'
import { useToast } from '../context/ToastContext'
import { uploadImage } from './adminApi'

/**
 * Gestionnaire CRUD générique piloté par configuration.
 *
 * props :
 *  - title, description : en-tête de la section
 *  - api       : { list, create, update, remove }
 *  - columns   : [{ key, label, render?(item) }]  -> colonnes du tableau
 *  - fields    : [{ name, label, type, options?, placeholder?, help?, required? }]
 *  - makeEmpty : () => objet vide pré-rempli pour la création
 *  - itemLabel : (item) => libellé utilisé dans les confirmations
 */
export default function ResourceManager({
  title,
  description,
  api,
  columns,
  fields,
  makeEmpty,
  itemLabel = (it) => it.title || it.stat_label || `#${it.id}`,
}) {
  const showToast = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // null | item (id existant) | item sans id (création)
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)

  const isNew = editing && editing.id == null

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await api.list()
      setItems(Array.isArray(data) ? data : data.results || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function openCreate() {
    const empty = makeEmpty()
    setEditing(empty)
    setForm(empty)
  }

  function openEdit(item) {
    setEditing(item)
    setForm(normalizeForEdit(item, fields))
  }

  function closeForm() {
    setEditing(null)
    setForm({})
  }

  function setField(name, value) {
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = buildPayload(form, fields)
      if (isNew) {
        await api.create(payload)
        showToast('Élément créé avec succès.')
      } else {
        await api.update(editing.id, payload)
        showToast('Modifications enregistrées.')
      }
      closeForm()
      await load()
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Supprimer « ${itemLabel(item)} » ? Cette action est irréversible.`)) return
    try {
      await api.remove(item.id)
      showToast('Élément supprimé.')
      await load()
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  const headerCells = useMemo(
    () => columns.map((c) => <th key={c.key}>{c.label}</th>),
    [columns],
  )

  return (
    <div className="admin-resource">
      <div className="admin-resource-head">
        <div>
          <h2>{title}</h2>
          {description && <p className="admin-muted">{description}</p>}
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          <i className="fas fa-plus"></i> Nouveau
        </button>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {loading ? (
        <div className="admin-loading">Chargement…</div>
      ) : items.length === 0 ? (
        <div className="admin-empty">Aucun élément pour l'instant.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {headerCells}
                <th className="admin-col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {columns.map((c) => (
                    <td key={c.key}>{c.render ? c.render(item) : item[c.key]}</td>
                  ))}
                  <td className="admin-col-actions">
                    <button className="admin-btn-icon" title="Modifier" onClick={() => openEdit(item)}>
                      <i className="fas fa-pen"></i>
                    </button>
                    <button
                      className="admin-btn-icon admin-btn-danger"
                      title="Supprimer"
                      onClick={() => handleDelete(item)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="admin-modal-overlay" onClick={closeForm}>
          <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
            <div className="admin-modal-head">
              <h3>{isNew ? `Ajouter — ${title}` : `Modifier — ${itemLabel(editing)}`}</h3>
              <button type="button" className="admin-btn-icon" onClick={closeForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="admin-modal-body">
              {fields.map((field) => (
                <Field key={field.name} field={field} value={form[field.name]} onChange={setField} />
              ))}
            </div>

            <div className="admin-modal-foot">
              <button type="button" className="admin-btn" onClick={closeForm}>
                Annuler
              </button>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

function Field({ field, value, onChange }) {
  const { name, label, type = 'text', options = [], placeholder, help, required, dir } = field
  const v = value ?? ''

  if (type === 'checkbox') {
    return (
      <label className="admin-field admin-field-check">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(name, e.target.checked)} />
        <span>{label}</span>
      </label>
    )
  }

  if (type === 'image') {
    return <ImageField field={field} value={v} onChange={onChange} />
  }

  return (
    <label className="admin-field">
      <span>
        {label}
        {required && <em className="admin-req"> *</em>}
      </span>
      {type === 'textarea' ? (
        <textarea
          rows={4}
          value={v}
          dir={dir}
          placeholder={placeholder}
          required={required}
          onChange={(e) => onChange(name, e.target.value)}
        />
      ) : type === 'select' ? (
        <select value={v} required={required} onChange={(e) => onChange(name, e.target.value)}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : type === 'number' ? (
        <input
          type="number"
          value={v}
          placeholder={placeholder}
          required={required}
          onChange={(e) => onChange(name, e.target.value === '' ? '' : Number(e.target.value))}
        />
      ) : (
        <input
          type={type}
          value={v}
          dir={dir}
          placeholder={placeholder}
          required={required}
          onChange={(e) => onChange(name, e.target.value)}
        />
      )}
      {help && <small className="admin-help">{help}</small>}
    </label>
  )
}

// Champ image : saisie d'un chemin/URL + téléversement de fichier + aperçu.
function ImageField({ field, value, onChange }) {
  const { name, label, placeholder, help } = field
  const showToast = useToast()
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      onChange(name, url)
      showToast('Image téléversée.')
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="admin-field">
      <span>{label}</span>
      <div className="admin-image-field">
        {value ? (
          <img className="admin-image-preview" src={value} alt="" />
        ) : (
          <div className="admin-image-preview admin-image-empty">
            <i className="fas fa-image"></i>
          </div>
        )}
        <div className="admin-image-controls">
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(name, e.target.value)}
          />
          <button
            type="button"
            className="admin-btn"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            <i className="fas fa-upload"></i> {uploading ? 'Envoi…' : 'Téléverser'}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFile}
          />
        </div>
      </div>
      {help && <small className="admin-help">{help}</small>}
    </div>
  )
}

// Prépare un item existant pour l'édition (formatage des dates -> datetime-local).
function normalizeForEdit(item, fields) {
  const out = { ...item }
  for (const f of fields) {
    if (f.type === 'datetime' && out[f.name]) {
      out[f.name] = toLocalInput(out[f.name])
    }
  }
  return out
}

// Construit le payload envoyé à l'API en ne gardant que les champs déclarés.
function buildPayload(form, fields) {
  const payload = {}
  for (const f of fields) {
    let val = form[f.name]
    if (f.type === 'datetime') {
      val = val ? new Date(val).toISOString() : null
    }
    if (f.type === 'number' && val === '') {
      val = null
    }
    payload[f.name] = val
  }
  return payload
}

// ISO -> 'YYYY-MM-DDTHH:MM' attendu par <input type="datetime-local">
function toLocalInput(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
