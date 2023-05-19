import { configureStore } from '@reduxjs/toolkit'
import authenticateReducer from './authenticateSlice'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    authenticate: authenticateReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
