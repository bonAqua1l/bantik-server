import { LOGIN, LOGOUT } from '../consts'

interface CompaniesData {
  id: number
  title: string
  image: string | null
  url: string
  desription: string | null
}

interface UserData {
    id: number
    email: string
    phone_number: string | null,
    first_name: string | null,
    last_name: string | null,
    surname: string | null,
    gender: string | null,
    citizenship: string | null,
    role: string | null,
    date_of_birth: string | null
    companies: CompaniesData[] | null
    current_warehouse: number | null
    avatar: string | null
}

export interface UserState {
    isAuth: boolean,
    userData: UserData | null
}

interface LoginAction {
    type: typeof LOGIN
    payload: UserData
}

interface LogoutAction {
    type: typeof LOGOUT
}

type UserAction = LoginAction | LogoutAction

const initialState: UserState = {
  isAuth: false,
  userData: null,
}

export const userState = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case LOGIN:
      return {
        isAuth: true,
        userData: action.payload,
      }
    case LOGOUT:
      return {
        isAuth: false,
        userData: null,
      }
    default:
      return state
  }
}
