import {Dispatch} from 'redux'

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
    // TODO: error can be 500 or another that does not match `error.message` format
    // so that can lead to another error
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
  }
}

export const changeUserPassword =
  actionCreator<PrefActionType.CHANGE_PASSWORD, string>(PrefActionType.CHANGE_PASSWORD)

export const updateUserPassword =
  (payload: IUpdatePasswordActionPayload) => async (dispatch:Dispatch): Promise<void> => {

  dispatch(userPreferencesRequestInitiated())
  try {
    const result = await operateUserDataRequest.updatePassword(payload)
    dispatch(changeUserPassword(result.status))
  } catch (error) {
    const destructuredError = {error}
    const destructuredMessage = JSON.parse(destructuredError.error.message)
    console.log(destructuredMessage)
    const messageArrayFromDestructuredError = destructuredMessage.error
    dispatch(userPreferencesRequestFailed(messageArrayFromDestructuredError))
  }
}