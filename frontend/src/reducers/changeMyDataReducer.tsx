import { PrefActionType, PrefActions } from '../actions/prefAndProfileActions'

interface ChangeInitState {
    nickname: string
    email: string
    id: number
}

export const initialState = {
    nickname: '',
    email: '',
    id: 1
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
                id: action.payload.id
            }

        default: return state
    }
}

export default changeMyDataReducer