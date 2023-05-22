import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getProfileFromLS } from '~/util/auth'
import User from '~/types/user.type'

interface Type {
  isAuthenticated: boolean
  profile: User | null
}

const initialState: Type = {
  isAuthenticated: Boolean(getProfileFromLS()),
  profile: getProfileFromLS()
}

const authenticateSlice = createSlice({
  initialState,
  name: 'authenticate',
  reducers: {
    setIsAuthenticated: (state, actions: PayloadAction<boolean>) => {
      state.isAuthenticated = actions.payload
    },
    setProfile: (state, actions: PayloadAction<User | null>) => {
      state.profile = actions.payload
    }
  }
})

const { actions, reducer } = authenticateSlice
export const { setIsAuthenticated, setProfile } = actions
export default reducer
