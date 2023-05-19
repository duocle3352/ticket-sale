import { createSlice } from '@reduxjs/toolkit'

interface Type {
  isAuthenticated: boolean
}

const initialState: Type = {
  isAuthenticated: false
}

const authenticateSlice = createSlice({
  initialState,
  name: 'authenticate',
  reducers: {}
})

const { actions, reducer } = authenticateSlice
// eslint-disable-next-line no-empty-pattern
export const {} = actions
export default reducer
