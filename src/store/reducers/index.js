import { combineReducers } from 'redux'

import { userState } from './userState'
import { warehouseState } from './warehouseState'

const rootReducer = combineReducers({
  user: userState,
  warehoses: warehouseState,
})

export default rootReducer
