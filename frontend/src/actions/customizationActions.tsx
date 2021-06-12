import {Dispatch} from 'redux'
import { toast } from 'react-toastify'

import {Action} from '../types/action'
import {actionCreator} from '../redux-utils/actionCreator'
import {customizationRequest} from '../api/HttpClientInstance'
import { errorMessage } from '../constants/errorAndSuccessMessages'

// Define action types

export enum CustomizationType {
  SET_USER_CUSTOMIZATION = 'custom/SET_USER_CUSTOMIZATION',
  REQUEST_FAILED = 'custom/REQUEST_FAILED',
  REQUEST_INITIATED = 'custom/REQUEST_INITIATED'
}

// Define actions

export type UserCustomizationSetAction = Action<CustomizationType.SET_USER_CUSTOMIZATION, IUserCustomizationResponse>
export type UserCustomizationRequestInitiatedAction = Action<CustomizationType.REQUEST_INITIATED>
export type UserCustomizationRequestFailedAction = Action<CustomizationType.REQUEST_FAILED, string>

export type CustomizationActions =
  | UserCustomizationRequestInitiatedAction
  | UserCustomizationRequestFailedAction
  | UserCustomizationSetAction


// Define action creators for init/fail

export const userCustomizationRequestInitiated =
  actionCreator<CustomizationType.REQUEST_INITIATED>(CustomizationType.REQUEST_INITIATED)
export const userCustomizationRequestFailed =
  actionCreator<CustomizationType.REQUEST_FAILED, string>(CustomizationType.REQUEST_FAILED)


// Define action creator and thunk for setting/fetching user preferences

export interface IUserCustomizationResponse {
  sendEmailsWithNews: boolean
  sendUpdatesThreads: boolean
  sendUserReviews: boolean
  sendUserQuestsReviews: boolean
  sendUpdatesMessages: boolean
  timezone: string
  aboutUser: string
}

export const setUserCustomization =
  actionCreator<CustomizationType.SET_USER_CUSTOMIZATION, IUserCustomizationResponse>
  (CustomizationType.SET_USER_CUSTOMIZATION)

export const successChangeUserCustomization = (payload: IUserCustomizationResponse) => 
  async (dispatch:Dispatch): Promise<void> => {
    dispatch(userCustomizationRequestInitiated())
    try {
      const result = await customizationRequest.changeUserCustomization(payload)
      console.log(payload)
      dispatch(setUserCustomization(result))
    } catch (error) {
      const destructuredMessage = JSON.parse(error.message)
      if (destructuredMessage) {
        const [messageArrayFromDestructuredError] = destructuredMessage.errors
        dispatch(userCustomizationRequestFailed(messageArrayFromDestructuredError.message))
        const errorText = (messageArrayFromDestructuredError.message).toString()
        toast.error(errorText)
      } else {
        dispatch(userCustomizationRequestFailed(errorMessage.errorUnknown))
        toast.error(errorMessage.errorUnknown)
      }
    }
}
