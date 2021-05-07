import {Dispatch} from 'redux'

import {Action} from '../types/action'
import {actionCreator} from '../redux-utils/actionCreator'
import {IUserPreference, IUserPreferenceNickChanged, IUserPreferenceErrored } from '../models/user'
import {workWithMyDataRequest} from '../api/HttpClientInstance'
import { refreshToken } from '../services/TokenRefresh'

export enum PrefActionType {
  CHANGE_NICK = 'pref/CHANGE_NICK',
  CHANGE_EMAIL = 'pref/CHANGE_EMAIL',
  RETRIEVE_DATA= 'pref/RETRIEVE_DATA',
  GOT_ERROR = 'pref/GOT_ERROR'
}

export interface IGetMyData {
  nickname: string
  email: string
  error?: string
}

export interface ISendData {
  oldNickname: string
  nickname: string
}

export interface IReceiveDataAfterChange {
  nickname: string
}

export type postedUserAction = Action<PrefActionType.CHANGE_NICK, IUserPreferenceNickChanged>
export type errorUserAction = Action<PrefActionType.GOT_ERROR, IUserPreferenceErrored>

export type PrefActions = postedUserAction | getUserAction | errorUserAction
export type getUserAction = Action<PrefActionType.RETRIEVE_DATA, IUserPreference>
export const postUserAction = actionCreator<PrefActionType.CHANGE_NICK, 
IUserPreferenceNickChanged>(PrefActionType.CHANGE_NICK)

export const getInqUserAction = actionCreator<PrefActionType.RETRIEVE_DATA, 
IUserPreference>(PrefActionType.RETRIEVE_DATA)

export const erroredUserAction = actionCreator<PrefActionType.GOT_ERROR, 
IUserPreferenceErrored>(PrefActionType.GOT_ERROR)

export const getMyData = () => async (dispatch:Dispatch<getUserAction>): Promise<void> => {

  try {
    const result = await workWithMyDataRequest.getData()
    dispatch(getInqUserAction(result))
  } catch (e) {
    refreshToken()
    console.log('Error:', e)
  }
}


export const changeMyData = (payload: ISendData ) => 
async (dispatch:Dispatch<postedUserAction>): Promise<void | string > => {

  try {
    console.log(payload)
    const result = await workWithMyDataRequest.saveData(payload)
    dispatch(postUserAction(result))
  } catch (error) {
    const destructuredError = {error}
    const destructuredMessage = JSON.parse(destructuredError.error.message)
    const [messageArrayFromDestructuredError] = destructuredMessage.errors
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    dispatch(erroredUserAction({error: messageArrayFromDestructuredError.message}))
  }
}