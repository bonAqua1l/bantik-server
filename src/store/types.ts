import { Store } from 'redux'

import rootReducer from './reducers'

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = Store<RootState>
export type AppDispatch = AppStore['dispatch']
