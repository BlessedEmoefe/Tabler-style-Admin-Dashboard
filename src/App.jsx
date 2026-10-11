import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MainLayout from './components/Layout/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function RootRedirect() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
}

function SectionPage({ title }) {
  return (
    <section>
      <h1 className="mb-4 text-xl font-medium text-[#1d273b]">{title}</h1>
      <div className="rounded border border-[#e6e7e9] bg-white px-5 py-8 text-sm text-[#667085] shadow-[0_1px_2px_rgba(18,24,38,0.05)]">
        This section is coming soon.
      </div>
    </section>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interface" element={<SectionPage title="Interface" />} />
          <Route path="/components" element={<SectionPage title="Components" />} />
          <Route path="/pages" element={<SectionPage title="Pages" />} />
          <Route path="/forms" element={<SectionPage title="Forms" />} />
          <Route path="/gallery" element={<SectionPage title="Gallery" />} />
          <Route path="/documentation" element={<SectionPage title="Documentation" />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
