import { PrefActionType, PrefActions } from '../actions/prefAndProfileActions'

interface ChangeInitState {
    nickname: string
    email: string
    error?: string
}

export const initialState = {
    nickname: '',
    email: '',
    error: ''
}

const changeMyDataReducer = ( state: ChangeInitState = initialState, action: PrefActions): ChangeInitState => {
    switch(action.type){
        case PrefActionType.RETRIEVE_DATA:
            return action.payload

        case PrefActionType.CHANGE_NICK:
            return {
                ...state,
                nickname: action.payload.nickname,
                error: action.payload.error
            }
            case PrefActionType.GOT_ERROR:
                return {
                    ...state,
                error: action.payload.error,
                }

        default: return state
    }
}

export default changeMyDataReducer