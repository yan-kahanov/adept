import { configureStore } from '@reduxjs/toolkit'
import companies from './companies'
import employees from './employees'

export const store = configureStore({
  reducer: {
    companies,
    employees
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch