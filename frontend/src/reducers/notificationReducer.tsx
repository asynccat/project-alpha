import { NotificationType, NotificationActions  } from '../actions/notificationActions'
import RemoteSource from '../types/RemoteSource'

interface IUserNotificationState extends RemoteSource {
    sendEmailsWithNews?: boolean
    sendUpdatesThreads?: boolean
    sendUserReviews?: boolean
    sendUserQuestsReviews?: boolean
    sendUpdatesMessages?: boolean
    timezone?: string
    aboutUser?: string
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

const notificationReducer = (state: IUserNotificationState = initialState, action: NotificationActions ):
IUserNotificationState => {
    switch(action.type){
        case NotificationType.REQUEST_NOTIFICATION_INITIATED:
            return {
                ...state,
                isLoading: true,
                init: true,
                status: '',
                error: ''
            }
        case NotificationType.REQUEST_NOTIFICATION_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case NotificationType.SET_USER_NOTIFICATION:
            return {
                ...state,
                isLoading: false,
                ...action.payload
            }
        default: return state
    }
}

export default notificationReducer