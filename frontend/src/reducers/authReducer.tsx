import { AuthActionType, AuthActions, IMessageResponse  } from '../actions/authActions'

interface IAuthState {
    passwordRecoveryResponse?: IMessageResponse
}

export const initialState = {
    passwordRecoveryResponse: {
        message: '',
        error: false
    }
}

const authReducer = (state: IAuthState = initialState, action: AuthActions ): IAuthState => {
    switch(action.type){
        case AuthActionType.RECEIVE_RECOVERY_MESSAGE:
            return {
                ...state,
                passwordRecoveryResponse: action.payload,
            }
        default: return state
    }
}

export default authReducer