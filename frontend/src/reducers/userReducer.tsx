
import {AuthActionType, AuthActions} from '../actions/authActions'

interface AuthInitState {
    loggedIn: boolean
    id: number
}

export const initialState = {
    loggedIn: false,
    id: 1,
}

const userReducer = (state: AuthInitState = initialState, action: AuthActions): AuthInitState => {
    switch(action.type){
        case AuthActionType.SET_USER:
            return {
                loggedIn: true,
                id: action.payload.id,
            }
        case AuthActionType.LOG_OUT:
            return {
                loggedIn: false,
                id: 1,
            }
        default: return state
    }
}

export default userReducer