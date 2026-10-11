import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TbBell, TbChevronDown, TbLogout, TbMenu2 } from 'react-icons/tb'
import { logout } from '../../store/slices/authSlice'
import { Brand } from './Sidebar'

export default function Header({ onMenuClick, sidebarOpen = false }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const displayName = user?.name?.trim() || 'Admin User'
  const displayRole = user?.role?.trim() || 'Administrator'
  const displayEmail = user?.email?.trim() || ''
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const menuRef = useRef(null)
  const notificationsRef = useRef(null)

  useEffect(() => {
    function handlePointerDown(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function toggleNotifications() {
    setNotificationsOpen((open) => !open)
    setMenuOpen(false)
  }

  function toggleMenu() {
    setMenuOpen((open) => !open)
    setNotificationsOpen(false)
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-30 flex h-14 items-center justify-between border-b border-[#e6e7e9] bg-white px-3 sm:px-4 lg:left-60">
      <div className="flex items-center gap-1 lg:hidden">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="rounded-md p-2 text-[#1d273b] hover:bg-[#f6f8fb]"
        >
          <TbMenu2 className="h-5 w-5" aria-hidden="true" />
        </button>
        <Brand />
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <div className="relative" ref={notificationsRef}>
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            aria-haspopup="true"
            onClick={toggleNotifications}
            className="relative rounded-md p-2 text-[#626976] hover:bg-[#f6f8fb] hover:text-[#1d273b]"
          >
            <TbBell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#d63939] ring-2 ring-white" />
          </button>

          {notificationsOpen ? (
            <div className="absolute right-0 z-20 mt-2 w-64 rounded-md border border-[#e6e7e9] bg-white p-3 text-sm text-[#626976] shadow-lg">
              No new notifications
            </div>
          ) : null}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={`Account menu for ${displayName}`}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="flex max-w-[14rem] items-center gap-2 rounded-md py-1 pr-1 pl-1 hover:bg-[#f6f8fb] sm:pr-2 sm:pl-2"
          >
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#dfe3e8]">
              <svg viewBox="0 0 24 24" className="mt-2 h-8 w-8 text-[#8b97a8]" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 19.2c1.4-3 3.8-4.4 7-4.4s5.6 1.4 7 4.4" />
              </svg>
            </span>
            <span className="hidden min-w-0 text-left leading-tight sm:block">
              <span className="block truncate text-sm font-medium text-[#1d273b]">{displayName}</span>
              <span className="block truncate text-xs text-[#667085]">{displayRole}</span>
            </span>
            <TbChevronDown className="hidden h-4 w-4 text-[#667085] sm:block" aria-hidden="true" />
          </button>

          {menuOpen ? (
            <div
              role="menu"
              className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-md border border-[#e6e7e9] bg-white shadow-lg"
            >
              <div className="border-b border-[#e6e7e9] px-3 py-2.5">
                <p className="truncate text-sm font-medium text-[#1d273b]">{displayName}</p>
                <p className="truncate text-xs text-[#667085]">{displayRole}</p>
                {displayEmail ? (
                  <p className="mt-0.5 truncate text-xs text-[#98a2b3]">{displayEmail}</p>
                ) : null}
              </div>
              <div className="p-1.5">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => dispatch(logout())}
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-medium text-[#d63939] hover:bg-red-50"
                >
                  <TbLogout className="h-4 w-4" aria-hidden="true" />
                  Log out
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
