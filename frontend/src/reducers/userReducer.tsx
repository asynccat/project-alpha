
import {AuthActionType, AuthActions} from '../actions/authActions'

interface AuthInitState {
    loggedIn: boolean
    // Here we use any becase type don't specified yet
    // eslint-disable-next-line
    user: any
}

export const initialState = {
    loggedIn: false,
    user: {}
}

const userReducer = (state: AuthInitState = initialState, action: AuthActions): AuthInitState => {
    switch(action.type){
        case AuthActionType.SET_USER:
            return {
                loggedIn: true,
                user: {...action.payload}
            }
        case AuthActionType.LOG_OUT:
            return {
                loggedIn: false,
                user: false
            }
        default: return state
    }
}

export default userReducer