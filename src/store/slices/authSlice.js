import { createSlice } from '@reduxjs/toolkit'
import { loadSession } from '../authStorage'

const session = loadSession()

const initialState = {
  user: session?.user ?? null,
  token: session?.token ?? null,
  isAuthenticated: Boolean(session?.token),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action) {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
    },
    loginFailure(state, action) {
      state.loading = false
      state.isAuthenticated = false
      state.error = action.payload ?? 'Login failed'
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions

export default authSlice.reducer
