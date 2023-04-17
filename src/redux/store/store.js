import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../components/slices/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})