/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CustomizationType, CustomizationActions  } from '../actions/customizationActions'
import RemoteSource from '../types/RemoteSource'

interface IUserCustomizationState extends RemoteSource {
    sendEmailsWithNews: boolean
    sendUpdatesThreads: boolean
    sendUserReviews: boolean
    sendUserQuestsReviews: boolean
    sendUpdatesMessages: boolean
    timezone: string
    aboutUser: string
}

export const initialState = {
    error: '',
    init: false,
    isLoading: false,
    status: '',
    sendEmailsWithNews: false,
    sendUpdatesThreads: false,
    sendUserReviews: true,
    sendUserQuestsReviews: false,
    sendUpdatesMessages: false,
    timezone: 'GMT',
    aboutUser: ''
}

const customizationReducer = (state: IUserCustomizationState = initialState, action: CustomizationActions ):
IUserCustomizationState => {
    switch(action.type){
        case CustomizationType.REQUEST_INITIATED:
            return {
                ...state,
                isLoading: true,
                init: true,
                status: '',
                error: ''
            }
        case CustomizationType.REQUEST_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case CustomizationType.SET_USER_CUSTOMIZATION:
            return {
                ...state,
                isLoading: false,
                sendEmailsWithNews: action.payload.sendEmailsWithNews,
                sendUpdatesThreads: action.payload.sendUpdatesThreads,
                sendUserReviews: action.payload.sendUserReviews,
                sendUserQuestsReviews: action.payload.sendUserQuestsReviews,
                sendUpdatesMessages: action.payload.sendUpdatesMessages,
                timezone: action.payload.timezone,
                aboutUser: action.payload.aboutUser,
            }
        default: return state
    }
}

export default customizationReducer