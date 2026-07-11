import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import { PropertyForm } from '../components/PropertyForm'

export function PropertyList() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [editingId, setEditingId] = useState(null)

  // 物件一覧を取得(RLSにより自分が登録した物件のみ返る)
  const fetchProperties = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setErrorMessage('物件の取得に失敗しました。')
    } else {
      setProperties(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  // 新規登録
  const handleCreate = async (values) => {
    setErrorMessage('')
    const { error } = await supabase
      .from('properties')
      .insert({ ...values, user_id: session.user.id })

    if (error) {
      setErrorMessage('物件の登録に失敗しました。')
      return
    }
    await fetchProperties()
  }

  // 更新
  const handleUpdate = async (id, values) => {
    setErrorMessage('')
    const { error } = await supabase.from('properties').update(values).eq('id', id)

    if (error) {
      setErrorMessage('物件の更新に失敗しました。')
      return
    }
    setEditingId(null)
    await fetchProperties()
  }

  // 削除
  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか?')) return

    setErrorMessage('')
    const { error } = await supabase.from('properties').delete().eq('id', id)

    if (error) {
      setErrorMessage('物件の削除に失敗しました。')
      return
    }
    await fetchProperties()
  }

  return (
    <div className="property-page">
      <header className="property-header">
        <div>
          <h1>物件一覧</h1>
          <p className="logged-in-user">{session?.user?.email}でログイン中</p>
        </div>
        <button type="button" onClick={handleLogout}>
          ログアウト
        </button>
      </header>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <section className="property-form-section">
        <h2>新規物件登録</h2>
        <PropertyForm submitLabel="登録" onSubmit={handleCreate} />
      </section>

      {loading ? (
        <p className="loading">読み込み中...</p>
      ) : (
        <div className="property-grid">
          {properties.length === 0 && <p>登録されている物件はまだありません。</p>}

          {properties.map((property) =>
            editingId === property.id ? (
              <div className="property-card" key={property.id}>
                <PropertyForm
                  initialValues={{
                    name: property.name,
                    rent: property.rent,
                    area: property.area,
                    layout: property.layout,
                  }}
                  submitLabel="更新"
                  onSubmit={(values) => handleUpdate(property.id, values)}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div className="property-card" key={property.id}>
                <h2>{property.name}</h2>
                <p className="property-rent">家賃: {property.rent.toLocaleString()}円</p>
                <p className="property-area">エリア: {property.area}</p>
                <p className="property-layout">間取り: {property.layout}</p>
                <div className="property-card-actions">
                  <button type="button" onClick={() => setEditingId(property.id)}>
                    編集
                  </button>
                  <button type="button" className="danger" onClick={() => handleDelete(property.id)}>
                    削除
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  )
}
