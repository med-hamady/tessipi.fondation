import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

/** Réserve l'accès aux utilisateurs authentifiés ; sinon redirige vers /admin/login. */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="admin-loading">Chargement…</div>
  }
  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }
  return children
}
