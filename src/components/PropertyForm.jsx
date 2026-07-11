import { useState } from 'react'

const emptyValues = { name: '', rent: '', area: '', layout: '' }

// 物件の新規登録・編集で共用するフォーム
export function PropertyForm({ initialValues = emptyValues, submitLabel, onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)

    await onSubmit({
      name: values.name,
      rent: Number(values.rent),
      area: values.area,
      layout: values.layout,
    })

    setSubmitting(false)
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <div className="property-form-row">
        <label>物件名</label>
        <input value={values.name} onChange={handleChange('name')} required />
      </div>

      <div className="property-form-row">
        <label>家賃(円)</label>
        <input
          type="number"
          min="0"
          value={values.rent}
          onChange={handleChange('rent')}
          required
        />
      </div>

      <div className="property-form-row">
        <label>エリア</label>
        <input value={values.area} onChange={handleChange('area')} required />
      </div>

      <div className="property-form-row">
        <label>間取り</label>
        <input
          value={values.layout}
          onChange={handleChange('layout')}
          placeholder="例: 1LDK"
          required
        />
      </div>

      <div className="property-form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? '送信中...' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={submitting}>
            キャンセル
          </button>
        )}
      </div>
    </form>
  )
}
