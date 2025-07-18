import { LOGIN, LOGOUT } from '../consts'

export const login = (user) => ({
  type: LOGIN,
  payload: user,
})

export const logout = () => ({
  type: LOGOUT,
  payload: null,
})
