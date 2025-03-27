import * as user from './user'
import * as warehouses from './warehouse'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...user,
  ...warehouses,
}
