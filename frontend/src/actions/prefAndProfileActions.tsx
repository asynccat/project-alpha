import {Dispatch} from 'redux'
import humps from 'humps'

import {Action} from '../types/action'
import {actionCreator} from '../redux-utils/actionCreator'
import {operateUserDataRequest} from '../api/HttpClientInstance'

// Define action types

export enum PrefActionType {
  CHANGE_NICK = 'pref/CHANGE_NICK',
  CHANGE_EMAIL = 'pref/CHANGE_EMAIL',
  SET_USER_PREFERENCES = 'pref/SET_USER_PREFERENCES',
  REQUEST_FAILED = 'pref/REQUEST_FAILED',
  REQUEST_INITIATED = 'pref/REQUEST_INITIATED'
}

// Define actions

export type UserPreferencesSetAction = Action<PrefActionType.SET_USER_PREFERENCES, IUserPreferencesResponse>
export type UserPreferencesRequestInitiatedAction = Action<PrefActionType.REQUEST_INITIATED>
export type UpdateNicknameAction = Action<PrefActionType.CHANGE_NICK, string>
export type UserPreferencesRequestFailedAction = Action<PrefActionType.REQUEST_FAILED, string>

export type PrefActions =
  | UserPreferencesRequestInitiatedAction
  | UserPreferencesRequestFailedAction
  | UpdateNicknameAction
  | UserPreferencesSetAction


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
    const [messageArrayFromDestructuredError] = destructuredMessage.errors
    dispatch(userPreferencesRequestFailed(messageArrayFromDestructuredError.message))
  }
}

// Define action creator and thunk for updating users nickname

export interface IUpdateNicknameActionPayload {
  oldNickname: string // old nickname is required to generate URL
  nickname: string
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

export const changeUserNickname =
  actionCreator<PrefActionType.CHANGE_NICK, string>(PrefActionType.CHANGE_NICK)

export const updateUserNickname =
  (payload: IUpdateNicknameActionPayload ) => async (dispatch:Dispatch): Promise<void> => {

  dispatch(userPreferencesRequestInitiated())
  try {
    const result = await operateUserDataRequest.updateNickname(payload)
    dispatch(changeUserNickname(result.nickname))
  } catch (error) {
    // TODO: error can be 500 or another that does not match `error.message` format
    // so that can lead to another error
    const destructuredError = {error}
    const destructuredMessage = JSON.parse(destructuredError.error.message)
    const [messageArrayFromDestructuredError] = destructuredMessage.errors
    dispatch(userPreferencesRequestFailed(messageArrayFromDestructuredError.message))
  } else {
    dispatch(userPreferencesRequestFailed('Something went wrong, please try again later'))
  }
}
}

export const changeUserPasswordSuccessfull =
  actionCreator<PrefActionType.CHANGE_PASSWORD, string>(PrefActionType.CHANGE_PASSWORD)

export const updateUserPassword =
  (payload: IUpdatePasswordActionPayload) => async (dispatch:Dispatch): Promise<void> => {

  dispatch(userPreferencesRequestInitiated())
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const payloadToSnakeCase : IUpdatePasswordActionPayloadSnakeCase = humps.decamelizeKeys(payload)

    const result = await operateUserDataRequest.updatePassword(payloadToSnakeCase)
    dispatch(changeUserPasswordSuccessfull(result.status))
  } catch (error) {
    const destructuredError = {error}
    const destructuredMessage = JSON.parse(destructuredError.error.message)
    if (destructuredMessage) {
      const messageArrayFromDestructuredError = destructuredMessage.error
      dispatch(userPreferencesRequestFailed(messageArrayFromDestructuredError))
    } else {
      dispatch(userPreferencesRequestFailed('Something went wrong, please try again later'))
    }
  }
}