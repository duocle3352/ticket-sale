import User from '~/types/user.type'

const PROFILE = 'profile'

export const getProfileFromLS = () => {
  const result = localStorage.getItem(PROFILE)
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem(PROFILE, JSON.stringify(profile))
}

export const clearAuthInLS = () => {
  localStorage.removeItem(PROFILE)
}
