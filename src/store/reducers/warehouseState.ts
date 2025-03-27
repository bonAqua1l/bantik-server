import { SET_WAREHOUSES } from '../consts'

interface Warehouses {
    id: number,
    title: string,
    image: string | null
}

export interface WarehouseState {
    warehouses: Warehouses[] | null
}

interface WarehouseAction {
    type: typeof SET_WAREHOUSES
    payload: Warehouses[] | null
}

type WarehouseMainAction = WarehouseAction

const initialState: WarehouseState = {
  warehouses: null,
}

export const warehouseState = (state: WarehouseState = initialState, action: WarehouseMainAction): WarehouseState => {
  switch (action.type) {
    case SET_WAREHOUSES:
      return {
        warehouses: action.payload,
      }
    default:
      return state
  }
}
