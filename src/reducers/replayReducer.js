import { GET_REPLAY_DATA } from '../actions/types'


const initialState = []

  export const getReplayReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REPLAY_DATA:
        return action.data
        
        default:
        return state
    }
}