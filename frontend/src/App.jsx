import { Navigate, Route, Routes } from 'react-router-dom'
import PublicSite from './PublicSite'
import { AuthProvider } from './admin/AuthContext'
import ProtectedRoute from './admin/ProtectedRoute'
import Login from './admin/Login'
import Dashboard from './admin/Dashboard'
import { ActionsManager, NewsManager, StatsManager } from './admin/managers'
import LegalPage from './legal/LegalPage'
import './admin/admin.css'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Site public */}
        <Route path="/" element={<PublicSite />} />

        {/* Pages légales (footer) */}
        <Route path="/legal/:slug" element={<LegalPage />} />

        {/* Administration */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<ActionsManager />} />
          <Route path="actualites" element={<NewsManager />} />
          <Route path="impact" element={<StatsManager />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
