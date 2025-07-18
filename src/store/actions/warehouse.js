import { SET_WAREHOUSES } from '../consts'

export const setWarehouse = (warehouses) => ({
  type: SET_WAREHOUSES,
  payload: warehouses,
})
