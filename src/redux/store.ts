import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authenticateReducer from './authenticateSlice'
import manageTicketReducer from './manageTicketSlice'
import packageReducer from './packageSlice'

const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
    manage: manageTicketReducer,
    package: packageReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
