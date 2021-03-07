/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {SET_USER, LOG_OUT, ActionsOfUser} from '../actions/index'

export const defaultState = {
    loggedIn: false,
    user: {}
}

const userReducer = (state = defaultState, action: ActionsOfUser) => {
    switch(action.type){
        case SET_USER:
            return {
                loggedIn: true,
                user: {...action.payload}
            }
        case LOG_OUT:
            localStorage.clear()
            return {
                loggedIn: false,
                user: false
            }
        default: return state
    }
}

export default userReducer