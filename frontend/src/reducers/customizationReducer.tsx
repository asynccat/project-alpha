/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CustomizationType, CustomizationActions  } from '../actions/customizationActions'
import RemoteSource from '../types/RemoteSource'

interface IUserCustomizationState extends RemoteSource {
    emailNews: boolean
    emailThreads: boolean
    emailMyReviews: boolean
    emailQuestReviews: boolean
    emailMessages: boolean
    timeZone: string
    aboutMe: string
}

export const initialState = {
    error: '',
    init: false,
    isLoading: false,
    status: '',
    emailNews: false,
    emailThreads: false,
    emailMyReviews: true,
    emailQuestReviews: false,
    emailMessages: false,
    timeZone: 'GMT',
    aboutMe: ''
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
                emailNews: action.payload.emailNews,
                emailThreads: action.payload.emailThreads,
                emailMyReviews: action.payload.emailMyReviews,
                emailQuestReviews: action.payload.emailQuestReviews,
                emailMessages: action.payload.emailMessages,
                timeZone: action.payload.timeZone,
                aboutMe: action.payload.aboutMe,
            }
        default: return state
    }
}

export default customizationReducer