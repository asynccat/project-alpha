import { PrefActionType, PrefActions } from '../actions/prefAndProfileActions'

interface ChangeInitState {
    nickname: string
    email: string
}

export const initialState = {
    nickname: '',
    email: ''
}

const changeMyDataReducer = ( state: ChangeInitState = initialState, action: PrefActions): ChangeInitState => {
    switch(action.type){
        case PrefActionType.RETRIEVE_DATA:
            return action.payload

        case PrefActionType.CHANGE_NICK:
            return {
                ...state,
                nickname: action.payload.nickname,
            }

        default: return state
    }
}

export default changeMyDataReducer