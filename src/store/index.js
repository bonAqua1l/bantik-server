import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import actions from './actions'
import rootReducer from './reducers'

let store

function getStore() {
  return store
}

export const initStore = (preloadedState = {}) => {
  let newStore

  newStore = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware()),
  )

  return newStore
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined
  }

  if (!store) store = _store

  return _store
}

export function useStore(initialeState) {
  return initializeStore(initialeState)
}

export { getStore, actions }
