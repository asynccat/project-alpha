import { Dispatch } from 'redux'
import { toast } from 'react-toastify'
import humps from 'humps'

import { Action } from '../types/action'
import { actionCreator } from '../redux-utils/actionCreator'
import { operateUserDataRequest } from '../api/HttpClientInstance'
import { errorMessage } from '../constants/errorAndSuccessMessages'

// Define action types

export enum NotificationType {
  SET_USER_NOTIFICATION = 'notify/SET_USER_NOTIFICATION',
  REQUEST_NOTIFICATION_FAILED = 'notify/NOTIFICATION_REQUEST_FAILED',
  REQUEST_NOTIFICATION_INITIATED = 'notify/NOTIFICATION_REQUEST_INITIATED'
}

// Define actions

export type UserNotificationSetAction = Action<NotificationType.SET_USER_NOTIFICATION, 
  IUserNotificationResponse>
export type UserNotificationRequestInitiatedAction = Action<NotificationType.REQUEST_NOTIFICATION_INITIATED>
export type UserNotificationRequestFailedAction = Action<NotificationType.REQUEST_NOTIFICATION_FAILED, string>

export type NotificationActions =
  | UserNotificationRequestInitiatedAction
  | UserNotificationRequestFailedAction
  | UserNotificationSetAction


// Define action creators for init/fail

export const userNotificationRequestInitiated =
  actionCreator<NotificationType.REQUEST_NOTIFICATION_INITIATED>(NotificationType.REQUEST_NOTIFICATION_INITIATED)
export const userNotificationRequestFailed =
  actionCreator<NotificationType.REQUEST_NOTIFICATION_FAILED, string>(NotificationType.REQUEST_NOTIFICATION_FAILED)


// Define action creator and thunk for setting/fetching user preferences

export interface IUserNotificationResponse {
  sendEmailsWithNews?: boolean
  sendUpdatesThreads?: boolean
  sendUserReviews?: boolean
  sendUserQuestsReviews?: boolean
  sendUpdatesMessages?: boolean
  timezone?: string
  aboutUser?: string
}

export interface IUserNotificationDecamelizedResponse {
  about_user?: string
  send_emails_with_news?: boolean
  send_updates_messages?: boolean
  send_updates_threads?: boolean
  send_user_quests_reviews?: boolean
  send_user_reviews?: boolean
  timezone?: string
}

export const setUserNotification =
  actionCreator<NotificationType.SET_USER_NOTIFICATION, IUserNotificationResponse 
  | IUserNotificationDecamelizedResponse>
  (NotificationType.SET_USER_NOTIFICATION)

export const successChangeUserNotification = (payload: IUserNotificationResponse 
  | IUserNotificationDecamelizedResponse) => 
  async (dispatch:Dispatch): Promise<void> => {
    dispatch(userNotificationRequestInitiated())
    try {
      const decamelizedPayload: IUserNotificationDecamelizedResponse = humps.decamelizeKeys(payload)
      const result = await operateUserDataRequest.changeUserNotification(decamelizedPayload)
      const camelizedResponse: IUserNotificationResponse = humps.camelizeKeys(result)
      dispatch(setUserNotification(camelizedResponse))
    } catch (error) {
      const destructuredMessage = JSON.parse(error.message)
      if (destructuredMessage) {
        const [messageArrayFromDestructuredError] = destructuredMessage.errors
        dispatch(userNotificationRequestFailed(messageArrayFromDestructuredError.message))
        const errorText = (messageArrayFromDestructuredError.message).toString()
        toast.error(errorText)
      } else {
        dispatch(userNotificationRequestFailed(errorMessage.errorUnknown))
        toast.error(errorMessage.errorUnknown)
      }
    }
}
