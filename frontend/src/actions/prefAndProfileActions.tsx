import {Dispatch} from 'redux'
import humps from 'humps'
import { toast } from 'react-toastify'

import {Action} from '../types/action'
import {actionCreator} from '../redux-utils/actionCreator'
import {operateUserDataRequest, operateUserDataRequestWithInterceptors} from '../api/HttpClientInstance'
import {successMessage, errorMessage } from '../constants/errorAndSuccessMessages'

// Define action types

export enum PrefActionType {
  CHANGE_NICK = 'pref/CHANGE_NICK',
  CHANGE_EMAIL = 'pref/CHANGE_EMAIL',
  CHANGE_PASSWORD = 'pref/CHANGE_PASSWORD',
  SET_USER_PREFERENCES = 'pref/SET_USER_PREFERENCES',
  REQUEST_FAILED = 'pref/REQUEST_FAILED',
  REQUEST_INITIATED = 'pref/REQUEST_INITIATED'
}

// Define actions

export type UserPreferencesSetAction = Action<PrefActionType.SET_USER_PREFERENCES, IUserPreferencesResponse>
export type UserPreferencesRequestInitiatedAction = Action<PrefActionType.REQUEST_INITIATED>
export type UpdateNicknameAction = Action<PrefActionType.CHANGE_NICK, string>
export type UserPreferencesRequestFailedAction = Action<PrefActionType.REQUEST_FAILED, string>
export type UpdatePasswordAction = Action<PrefActionType.CHANGE_PASSWORD, string>
export type UpdateEmailAction = Action<PrefActionType.CHANGE_EMAIL, string>

export type PrefActions =
  | UserPreferencesRequestInitiatedAction
  | UserPreferencesRequestFailedAction
  | UpdateNicknameAction
  | UserPreferencesSetAction
  | UpdatePasswordAction
  | UpdateEmailAction


// Define action creators for init/fail

export const userPreferencesRequestInitiated =
  actionCreator<PrefActionType.REQUEST_INITIATED>(PrefActionType.REQUEST_INITIATED)
export const userPreferencesRequestFailed =
  actionCreator<PrefActionType.REQUEST_FAILED, string>(PrefActionType.REQUEST_FAILED)


// Define action creator and thunk for setting/fetching user preferences

export interface IUserPreferencesResponse {
  nickname: string
  email: string
}

export const setUserPreferences =
  actionCreator<PrefActionType.SET_USER_PREFERENCES, IUserPreferencesResponse>(PrefActionType.SET_USER_PREFERENCES)

export const fetchUserPreferences = () => async (dispatch:Dispatch): Promise<void> => {
  dispatch(userPreferencesRequestInitiated())
  try {
    const result = await operateUserDataRequest.fetchUserPreferences()
    dispatch(setUserPreferences(result))
  } catch (error) {
    const destructuredMessage = JSON.parse(error.message)
    if (destructuredMessage) {
      const [messageArrayFromDestructuredError] = destructuredMessage.errors
      dispatch(userPreferencesRequestFailed(messageArrayFromDestructuredError.message))
      const errorText = (messageArrayFromDestructuredError.message).toString()
      toast.error(errorText)
    } else {
      dispatch(userPreferencesRequestFailed(errorMessage.errorUnknown))
      toast.error(errorMessage.errorUnknown)
    }
  }
}

// Define action creator and thunk for updating users nickname

export interface IUpdateNicknameActionPayload {
  oldNickname: string // old nickname is required to generate URL
  nickname: string
}

export const changeUserNickname =
  actionCreator<PrefActionType.CHANGE_NICK, string>(PrefActionType.CHANGE_NICK)

export const updateUserNickname =
  (payload: IUpdateNicknameActionPayload ) => async (dispatch:Dispatch): Promise<void> => {

  dispatch(userPreferencesRequestInitiated())
  try {
    const result = await operateUserDataRequest.updateNickname(payload)
    dispatch(changeUserNickname(result.nickname))
    toast.success(successMessage.successNicknameChange)
  } catch (error) {
    const destructuredError = {error}
    const destructuredMessage = JSON.parse(destructuredError.error.message)
    if (destructuredMessage) {
    const [messageArrayFromDestructuredError] = destructuredMessage.errors
    dispatch(userPreferencesRequestFailed(messageArrayFromDestructuredError.message))
    const errorText = (messageArrayFromDestructuredError.message).toString()
    toast.error(errorText)
  } else {
    dispatch(userPreferencesRequestFailed(errorMessage.errorUnknown))
    toast.error(errorMessage.errorUnknown)
  }
}
}

export interface IUpdatePasswordActionPayload {
  // the way it comes from user input
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface IUpdatePasswordActionPayloadSnakeCase {
  // the way its transformed for backend
  old_password: string
  new_password: string
  confirm_password: string
}

export const changeUserPasswordSuccessfull =
  actionCreator<PrefActionType.CHANGE_PASSWORD, string>(PrefActionType.CHANGE_PASSWORD)

export const updateUserPassword =
  (payload: IUpdatePasswordActionPayload | IUpdatePasswordActionPayloadSnakeCase ) => 
  async (dispatch:Dispatch): Promise<void> => {

  dispatch(userPreferencesRequestInitiated())
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const payloadToSnakeCase : IUpdatePasswordActionPayloadSnakeCase = humps.decamelizeKeys(payload)

    const result = await operateUserDataRequest.updatePassword(payloadToSnakeCase)
    dispatch(changeUserPasswordSuccessfull(result.status))
    toast.success(successMessage.successPasswordChange)
  } catch (error) {
    const destructuredError = {error}
    const destructuredMessage = JSON.parse(destructuredError.error.message)
    if (destructuredMessage) {
      const messageArrayFromDestructuredError = destructuredMessage.error
      dispatch(userPreferencesRequestFailed(messageArrayFromDestructuredError))
      toast.error(messageArrayFromDestructuredError)
    } else {
      dispatch(userPreferencesRequestFailed(errorMessage.errorUnknown))
      toast.error(errorMessage.errorUnknown)
    }
  }
}

export interface IUpdateEmailActionPayload {
  email: string
  password: string
}

export const changeUserEmailSuccessfull =
  actionCreator<PrefActionType.CHANGE_EMAIL, string>(PrefActionType.CHANGE_EMAIL)

export const updateUserEmail =
  (payload: IUpdateEmailActionPayload ) => 
  async (dispatch:Dispatch): Promise<void> => {

  dispatch(userPreferencesRequestInitiated())
  try {
    const result = await operateUserDataRequestWithInterceptors.updateEmail(payload)
    dispatch(changeUserEmailSuccessfull(result.email))
    toast.success(successMessage.successEmailChange)
  } catch (error) {
    const destructuredError = {error}
    const destructuredMessage = JSON.parse(destructuredError.error.message)
    if (destructuredMessage) {
      const messageArrayFromDestructuredError = destructuredMessage.error
      dispatch(userPreferencesRequestFailed(messageArrayFromDestructuredError))
      toast.error(messageArrayFromDestructuredError)
    } else {
      dispatch(userPreferencesRequestFailed(errorMessage.errorUnknown))
      toast.error(errorMessage.errorUnknown)
    }
  }
}