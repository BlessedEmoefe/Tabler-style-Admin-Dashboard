import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import {
  TbBook,
  TbBrandTabler,
  TbComponents,
  TbFileDescription,
  TbForms,
  TbHome,
  TbLayout2,
  TbPhoto,
  TbX,
} from 'react-icons/tb'

const links = [
  { to: '/dashboard', label: 'Home', icon: TbHome },
  { to: '/interface', label: 'Interface', icon: TbLayout2 },
  { to: '/components', label: 'Components', icon: TbComponents },
  { to: '/pages', label: 'Pages', icon: TbFileDescription },
  { to: '/forms', label: 'Forms', icon: TbForms },
  { to: '/gallery', label: 'Gallery', icon: TbPhoto },
  { to: '/documentation', label: 'Documentation', icon: TbBook },
]

export function Brand({ onClick, className = '' }) {
  return (
    <NavLink
      to="/dashboard"
      onClick={onClick}
      className={`flex items-center gap-2 ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#206bc4] text-white">
        <TbBrandTabler className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-[#1d273b]">tabler</span>
    </NavLink>
  )
}

function linkClass({ isActive }) {
  return [
    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-[#206bc4]/10 text-[#206bc4]'
      : 'text-[#626976] hover:bg-[#f6f8fb] hover:text-[#1d273b]',
  ].join(' ')
}

export default function Sidebar({ open, onClose }) {
  const asideRef = useRef(null)

  useEffect(() => {
    const aside = asideRef.current
    if (!aside) return undefined

    const desktop = window.matchMedia('(min-width: 1024px)')

    function syncInert() {
      aside.inert = !desktop.matches && !open
    }

    syncInert()
    desktop.addEventListener('change', syncInert)
    return () => desktop.removeEventListener('change', syncInert)
  }, [open])

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-[#1d273b]/40 lg:hidden"
          onClick={onClose}
        />
      ) : null}

      <aside
        ref={asideRef}
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-60 max-w-[85vw] flex-col border-r border-[#e6e7e9] bg-white shadow-xl transition-transform duration-200 lg:translate-x-0 lg:shadow-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-[#e6e7e9] px-4">
          <Brand onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-md p-1.5 text-[#626976] hover:bg-[#f6f8fb] lg:hidden"
          >
            <TbX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="space-y-1">
            {links.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/dashboard'} className={linkClass} onClick={onClose}>
                  <Icon className="h-[1.125rem] w-[1.125rem] shrink-0" aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
