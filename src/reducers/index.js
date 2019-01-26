import { combineReducers } from 'redux'
import sessionReducer from './session'
import userReducer from './user'
import messageReducer from './message'
import visitors from './visitors'
import tickets from './tickets'
import visits from './visits'

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  messageState: messageReducer,
  tickets,
  visitors,
  visits
})

export default rootReducer
