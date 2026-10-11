import { createSlice } from '@reduxjs/toolkit'

const emptyStat = { value: '0', change: '0%', isPositive: true }

const initialState = {
  stats: {
    newTickets: { ...emptyStat },
    closedToday: { ...emptyStat },
    newReplies: { ...emptyStat },
    followers: { ...emptyStat },
    dailyEarnings: { ...emptyStat },
    products: { ...emptyStat },
  },
  activityData: [],
  commits: [],
  chartData: [],
  loading: true,
  error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardRequest(state) {
      state.error = null
    },
    fetchDashboardStart(state) {
      state.loading = true
      state.error = null
    },
    fetchDashboardSuccess(state, action) {
      const { stats, activityData, commits, chartData } = action.payload

      state.loading = false
      state.error = null
      state.stats = stats
      state.activityData = activityData
      state.commits = commits
      state.chartData = chartData
    },
    fetchDashboardFailure(state, action) {
      state.loading = false
      state.error = action.payload ?? 'Failed to load dashboard'
    },
  },
})

export const {
  fetchDashboardRequest,
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} = dashboardSlice.actions

export default dashboardSlice.reducer
