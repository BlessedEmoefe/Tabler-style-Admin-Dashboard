const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export function loadSession() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return null

    const rawUser = localStorage.getItem(USER_KEY)
    const user = rawUser ? JSON.parse(rawUser) : null

    return { token, user }
  } catch {
    return null
  }
}

export function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
