import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { loginFailure, loginStart, loginSuccess, logout } from '../slices/authSlice'
import { clearSession, saveSession } from '../authStorage'

function createFakeSession(email) {
  return {
    token: 'fake-token',
    user: {
      id: 1,
      name: 'Admin User',
      email,
      role: 'Administrator',
    },
  }
}

function* handleLogin(action) {
  try {
    const email = action.payload?.email?.trim() ?? ''
    const password = action.payload?.password ?? ''

    if (!email || !password) {
      yield put(loginFailure('Email and password are required.'))
      return
    }

    yield delay(1000)

    const session = createFakeSession(email)
    yield call(saveSession, session.token, session.user)
    yield put(loginSuccess(session))
  } catch (error) {
    yield put(loginFailure(error?.message || 'Unable to sign in. Please try again.'))
  }
}

function* handleLogout() {
  yield call(clearSession)
}

export function* authSaga() {
  yield takeLatest(loginStart.type, handleLogin)
  yield takeLatest(logout.type, handleLogout)
}
