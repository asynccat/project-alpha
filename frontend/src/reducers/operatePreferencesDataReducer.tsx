import { PrefActionType, PrefActions } from '../actions/prefAndProfileActions'
import RemoteSource from '../types/RemoteSource'

interface IUserPreferencesState extends RemoteSource {
    nickname: string
    email: string
}

export const initialState = {
    nickname: '',
    email: '',
    error: '',
    init: false,
    isLoading: false
}

const operatePreferencesDataReducer = (state: IUserPreferencesState = initialState, action: PrefActions):
IUserPreferencesState => {
    switch(action.type){
        case PrefActionType.REQUEST_INITIATED:
            return {
                ...state,
                isLoading: true,
                init: true,
            }
        case PrefActionType.REQUEST_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        case PrefActionType.RETRIEVE_DATA:
            return {
                ...state,
                isLoading: false,
                nickname: action.payload.nickname,
                email: action.payload.email,
            }

        case PrefActionType.CHANGE_NICK:
            return {
                ...state,
                isLoading: false,
                nickname: action.payload.nickname,
            }

        default: return state
    }
}

export default operatePreferencesDataReducer