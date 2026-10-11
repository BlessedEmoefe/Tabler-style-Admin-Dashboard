import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import dashboardReducer from './slices/dashboardSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
})

export default rootReducer
