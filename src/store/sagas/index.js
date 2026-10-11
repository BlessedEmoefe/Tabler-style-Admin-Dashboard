import { all } from 'redux-saga/effects'
import { authSaga } from './authSaga'
import { dashboardSaga } from './dashboardSaga'

export function* rootSaga() {
  yield all([authSaga(), dashboardSaga()])
}
