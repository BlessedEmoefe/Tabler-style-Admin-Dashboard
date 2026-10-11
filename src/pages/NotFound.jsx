import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4 py-10">
      <div className="flex w-full max-w-md flex-col items-center rounded border border-[#e6e7e9] bg-white px-6 py-10 text-center shadow-[0_1px_2px_rgba(18,24,38,0.05)]">
        <p className="text-sm font-semibold tracking-wide text-[#206bc4]">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-[#1d273b]">Page not found</h1>
        <p className="mt-2 text-sm text-[#667085]">
          That address doesn’t match a page in the admin dashboard.
        </p>
        <Link
          to={isAuthenticated ? '/dashboard' : '/login'}
          className="mt-6 rounded-md bg-[#206bc4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a5cad]"
        >
          {isAuthenticated ? 'Back to dashboard' : 'Go to login'}
        </Link>
      </div>
    </main>
  )
}
