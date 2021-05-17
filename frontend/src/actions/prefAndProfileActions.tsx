import {Dispatch} from 'redux'

import {Action} from '../types/action'
import {actionCreator} from '../redux-utils/actionCreator'
import {IUserPreference, IUserPreferenceNickChanged, IUserPreferenceErrored, 
  IUserPreferenceInitiatedReq } from '../models/user'
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

export type UserPreferencesSetAction = Action<PrefActionType.SET_USER_PREFERENCES, IUserPreference>
export type UserPreferencesRequestInitiatedAction =
  Action<PrefActionType.REQUEST_INITIATED, IUserPreferenceInitiatedReq>
export type UpdateNicknameAction = Action<PrefActionType.CHANGE_NICK, IUserPreferenceNickChanged>
export type UserPreferencesRequestFailedAction = Action<PrefActionType.REQUEST_FAILED, IUserPreferenceErrored>

export type PrefActions =
  | UserPreferencesRequestInitiatedAction
  | UserPreferencesRequestFailedAction
  | UpdateNicknameAction
  | UserPreferencesSetAction


// Define action creators for init/fail

export const userPreferencesRequestInitiated =
  actionCreator<PrefActionType.REQUEST_INITIATED>(PrefActionType.REQUEST_INITIATED)
export const userPreferencesRequestFailed = actionCreator<PrefActionType.REQUEST_FAILED,
  IUserPreferenceErrored>(PrefActionType.REQUEST_FAILED)


// Define action creator and thunk for setting/fetching user preferences

export interface IUserPreferencesResponse {
  nickname: string
  email: string
}

export const setUserPreferences = actionCreator<PrefActionType.SET_USER_PREFERENCES,
IUserPreferencesResponse>(PrefActionType.SET_USER_PREFERENCES)

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
    dispatch(userPreferencesRequestFailed({error: messageArrayFromDestructuredError.message}))
  }
}

// Define action creator and thunk for updating users nickname

export interface IUpdateNicknameActionPayload {
  oldNickname: string // old nickname is required to generate URL
  nickname: string
}

export interface INicknameUpdateResponse {
  nickname: string
}

export const changeUserNickname = actionCreator<PrefActionType.CHANGE_NICK,
  IUserPreferenceNickChanged>(PrefActionType.CHANGE_NICK)

export const updateUserNickname =
  (payload: IUpdateNicknameActionPayload ) => async (dispatch:Dispatch): Promise<void> => {

  dispatch(userPreferencesRequestInitiated())
  try {
    const result = await operateUserDataRequest.updateNickname(payload)
    dispatch(changeUserNickname(result))
  } catch (error) {
    // TODO: error can be 500 or another that does not match `error.message` format
    // so that can lead to another error
    const destructuredError = {error}
    const destructuredMessage = JSON.parse(destructuredError.error.message)
    const [messageArrayFromDestructuredError] = destructuredMessage.errors
    dispatch(userPreferencesRequestFailed({error: messageArrayFromDestructuredError.message}))
  }
}