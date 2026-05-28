import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const NAV = [
  { to: '/admin', end: true, icon: 'fa-hand-holding-heart', label: 'Nos actions' },
  { to: '/admin/actualites', icon: 'fa-newspaper', label: 'Actualités' },
  { to: '/admin/impact', icon: 'fa-chart-line', label: 'Notre impact' },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className={`admin-shell${menuOpen ? ' admin-shell-open' : ''}`}>
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <i className="fas fa-hand-holding-heart"></i>
          <span>TESSIPI <strong>Admin</strong></span>
        </div>
        <nav className="admin-nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <a href="/" className="admin-nav-link admin-nav-back">
          <i className="fas fa-arrow-left"></i>
          <span>Retour au site</span>
        </a>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="admin-topbar-title">Tableau de bord</div>
          <div className="admin-user">
            <i className="fas fa-user-circle"></i>
            <span>{user?.username}</span>
            <button className="admin-btn admin-btn-ghost" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Déconnexion
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      {menuOpen && <div className="admin-backdrop" onClick={() => setMenuOpen(false)} />}
    </div>
  )
}
