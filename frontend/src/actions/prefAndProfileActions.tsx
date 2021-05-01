import {Dispatch} from 'redux'

import {Action} from '../types/action'
import {actionCreator} from '../redux-utils/actionCreator'
import {IUserPreference, IUserPreferenceNickChanged} from '../models/user'
import {workWithMyDataRequest} from '../api/HttpClientInstance'
import { refreshToken } from '../services/TokenRefresh'

export enum PrefActionType {
  CHANGE_NICK = 'pref/CHANGE_NICK',
  CHANGE_EMAIL = 'pref/CHANGE_EMAIL',
  RETRIEVE_DATA= 'pref/RETRIEVE_DATA'
}

export interface IGetMyData {
  nickname: string
  email: string
}

export interface ISendData {
  oldNickname: string
  nickname: string
}

export interface IReceiveDataAfterChange {
  nickname: string
}

export type postedUserAction = Action<PrefActionType.CHANGE_NICK, IUserPreferenceNickChanged>

export type PrefActions = postedUserAction | getUserAction
export type getUserAction = Action<PrefActionType.RETRIEVE_DATA, IUserPreference>
export const postUserAction = actionCreator<PrefActionType.CHANGE_NICK, 
IUserPreferenceNickChanged>(PrefActionType.CHANGE_NICK)

export const getInqUserAction = actionCreator<PrefActionType.RETRIEVE_DATA, 
IUserPreference>(PrefActionType.RETRIEVE_DATA)

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
async (dispatch:Dispatch<postedUserAction>): Promise<void> => {

  try {
    console.log(payload)
    const result = await workWithMyDataRequest.saveData(payload)
    dispatch(postUserAction(result))
  } catch (e) {
    console.log('Error:', e)
  }
}

