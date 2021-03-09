/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {AuthActionType, AuthActions} from '../actions/authActions'

export const defaultState = {
    loggedIn: false,
    user: {}
}

const userReducer = (state = defaultState, action: AuthActions) => {
    switch(action.type){
        case AuthActionType.SET_USER:
            return {
                loggedIn: true,
                user: {...action.payload}
            }
        case AuthActionType.LOG_OUT:
            localStorage.clear()
            return {
                loggedIn: false,
                user: false
            }
        default: return state
    }
}

export default userReducer