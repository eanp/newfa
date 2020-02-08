import { combineReducers } from 'redux'

import resto from './Resto'
import restoitems from './RestoItems'
import users from './Users'
import items from './Items'
import login from './Login'

const appReducer = combineReducers({
  resto, users, items, login, restoitems
})

export default appReducer
