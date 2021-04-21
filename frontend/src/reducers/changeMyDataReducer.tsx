import { PrefActionType, PrefActions } from '../actions/prefAndProfileActions'

interface ChangeInitState {
    nickname: string
    email: string
}

export const initialState = {
    nickname: '',
    email: '',
}

const changeMyDataReducer = ( state: ChangeInitState = initialState, action: PrefActions): ChangeInitState => {
    switch(action.type){
        case PrefActionType.RETRIEVE_DATA:
            return action.payload

        case PrefActionType.CHANGE_DATA:
            return {
                ...state,
                nickname: action.payload.nickname,
                email: action.payload.email,
            }

        default: return state
    }
}

export default changeMyDataReducer