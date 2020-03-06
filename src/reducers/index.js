import { combineReducers } from 'redux'
import { getReplayReducer } from './replayReducer'

export default combineReducers({
    data : getReplayReducer
})