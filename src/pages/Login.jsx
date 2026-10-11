import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { loginStart } from '../store/slices/authSlice'

export default function Login() {
  const dispatch = useDispatch()
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(loginStart({ email, password }))
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4 py-10">
      <div className="w-full max-w-[400px]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#206bc4] text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
              <path
                d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5.5v-5.5h-3V21H5a1 1 0 0 1-1-1v-9.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#1d273b]">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-[#667085]">Sign in to your account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-[#e6e7e9] bg-white p-6 shadow-[0_1px_2px_rgba(18,24,38,0.04),0_8px_24px_rgba(18,24,38,0.04)]"
          noValidate
        >
          {error ? (
            <p
              role="alert"
              className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          ) : null}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#1d273b]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="admin@company.com"
              value={email}
              disabled={loading}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-[#dce1e7] bg-white px-3 py-2 text-sm text-[#1d273b] outline-none transition placeholder:text-[#98a2b3] focus:border-[#206bc4] focus:ring-4 focus:ring-[#206bc4]/15 disabled:bg-[#f5f7fb]"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#1d273b]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              disabled={loading}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-[#dce1e7] bg-white px-3 py-2 text-sm text-[#1d273b] outline-none transition placeholder:text-[#98a2b3] focus:border-[#206bc4] focus:ring-4 focus:ring-[#206bc4]/15 disabled:bg-[#f5f7fb]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-[#206bc4] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a5cad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#206bc4] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>

          <p className="mt-4 text-center text-xs text-[#667085]">
            Any email and password will sign you in.
          </p>
        </form>
      </div>
    </main>
  )
}
