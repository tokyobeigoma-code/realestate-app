import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'

// 物件一覧のダミーデータ
const dummyProperties = [
  { id: 1, name: 'サンシャイン渋谷', rent: '120,000円', area: '東京都渋谷区' },
  { id: 2, name: 'グリーンパレス新宿', rent: '98,000円', area: '東京都新宿区' },
  { id: 3, name: 'リバーサイド横浜', rent: '85,000円', area: '神奈川県横浜市' },
  { id: 4, name: 'パークコート池袋', rent: '110,000円', area: '東京都豊島区' },
]

export function PropertyList() {
  const { session } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
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

      <div className="property-grid">
        {dummyProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <h2>{property.name}</h2>
            <p className="property-rent">家賃: {property.rent}</p>
            <p className="property-area">エリア: {property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
