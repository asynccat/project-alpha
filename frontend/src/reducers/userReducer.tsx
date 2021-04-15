
import {AuthActionType, AuthActions} from '../actions/authActions'

interface AuthInitState {
    loggedIn: boolean
}

export const initialState = {
    loggedIn: false,
}

const userReducer = (state: AuthInitState = initialState, action: AuthActions): AuthInitState => {
    switch(action.type){
        case AuthActionType.SET_USER:
            return {
                loggedIn: true,
            }
        case AuthActionType.LOG_OUT:
            return {
                loggedIn: false,
            }
        default: return state
    }
}

export default userReducer