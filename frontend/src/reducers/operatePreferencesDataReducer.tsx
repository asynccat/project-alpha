/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrefActionType, PrefActions } from '../actions/prefAndProfileActions'
import RemoteSource from '../types/RemoteSource'

interface IUserPreferencesState extends RemoteSource {
    nickname: string
    email: string
    avatar: string
}

export const initialState = {
    nickname: '',
    email: '',
    avatar: '',
    error: '',
    init: false,
    isLoading: false,
    status: '',
}

const operatePreferencesDataReducer = (state: IUserPreferencesState = initialState, action: PrefActions):
IUserPreferencesState => {
    switch(action.type){
        case PrefActionType.REQUEST_INITIATED:
            return {
                ...state,
                isLoading: true,
                init: true,
                status: '',
                error: ''
            }
        case PrefActionType.REQUEST_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case PrefActionType.SET_USER_PREFERENCES:
            return {
                ...state,
                isLoading: false,
                nickname: action.payload.nickname,
                email: action.payload.email,
                avatar: action.payload.avatar,
            }

        case PrefActionType.CHANGE_NICK:
            return {
                ...state,
                isLoading: false,
                nickname: action.payload,
            }
        
        case PrefActionType.CHANGE_PASSWORD:
            return {
                ...state,
                isLoading: false,
                status: action.payload,
                error: ''
                }

        case PrefActionType.CHANGE_EMAIL:
            return {
                ...state,
                isLoading: false,
                email: action.payload,
                status: action.payload,
                error: ''
                }   
                
        case PrefActionType.CHANGE_AVATAR:
            return {
                ...state,
                isLoading: false,
                avatar: action.payload,
                error: ''
                }   
        default: return state
    }
}

export default operatePreferencesDataReducer