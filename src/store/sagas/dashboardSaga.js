import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchDashboardFailure,
  fetchDashboardRequest,
  fetchDashboardStart,
  fetchDashboardSuccess,
} from '../slices/dashboardSlice'

const mockDashboard = {
  stats: {
    newTickets: { value: '43', change: '+6%', isPositive: true },
    closedToday: { value: '17', change: '-3%', isPositive: false },
    newReplies: { value: '7', change: '+9%', isPositive: true },
    followers: { value: '27.3k', change: '+3%', isPositive: true },
    dailyEarnings: { value: '$95', change: '-2%', isPositive: false },
    products: { value: '621', change: '-1%', isPositive: false },
  },
  activityData: [
    { month: 'Jan', purchases: 18 },
    { month: 'Feb', purchases: 26 },
    { month: 'Mar', purchases: 20 },
    { month: 'Apr', purchases: 32 },
    { month: 'May', purchases: 24 },
    { month: 'Jun', purchases: 38 },
    { month: 'Jul', purchases: 22 },
    { month: 'Aug', purchases: 30 },
    { month: 'Sep', purchases: 28 },
    { month: 'Oct', purchases: 46 },
    { month: 'Nov', purchases: 74 },
    { month: 'Dec', purchases: 62 },
  ],
  commits: [
    { name: 'Ronald Bradley', avatar: 'RB', message: 'Initial commit', date: 'May 6, 2018' },
    { name: 'Russell Gibson', avatar: 'RG', message: 'Main structure', date: 'April 22, 2018' },
    {
      name: 'Beverly Armstrong',
      avatar: 'BA',
      message: 'Left sidebar adjustments',
      date: 'April 15, 2018',
    },
    { name: 'Bobby Knight', avatar: 'BK', message: 'Topbar dropdown style', date: 'April 8, 2018' },
    { name: 'Sharon Wells', avatar: 'SW', message: 'Fix documentation links', date: 'April 2, 2018' },
  ],
  chartData: [
    {
      id: 'completion',
      title: 'Chart title',
      innerRadius: '58%',
      data: [
        { name: 'Completed', value: 63, color: '#2fb344', labelColor: '#ffffff' },
        { name: 'Remaining', value: 37, color: '#b7e4a8', labelColor: '#1d273b' },
      ],
    },
    {
      id: 'distribution',
      title: 'Chart title',
      innerRadius: 0,
      data: [
        { name: 'Primary', value: 47.4, color: '#1e3148', labelColor: '#ffffff' },
        { name: 'Secondary', value: 33.1, color: '#3d6ea8', labelColor: '#ffffff' },
        { name: 'Tertiary', value: 10.5, color: '#a9c7e8', labelColor: '#1d273b' },
        { name: 'Other', value: 9, color: '#d5dde6', labelColor: '#1d273b' },
      ],
    },
  ],
}

function fetchDashboard() {
  const delayMs = 1000 + Math.floor(Math.random() * 501)

  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDashboard), delayMs)
  })
}

function* handleFetchDashboard() {
  try {
    yield put(fetchDashboardStart())
    const data = yield call(fetchDashboard)
    yield put(fetchDashboardSuccess(data))
  } catch (error) {
    yield put(fetchDashboardFailure(error?.message || 'Failed to load dashboard'))
  }
}

export function* dashboardSaga() {
  yield takeLatest(fetchDashboardRequest.type, handleFetchDashboard)
}
