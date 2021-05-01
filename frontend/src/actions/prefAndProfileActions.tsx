import {Dispatch} from 'redux'

import {Action} from '../types/action'
import {actionCreator} from '../redux-utils/actionCreator'
import {IUserPreference} from '../models/user'
import {workWithMyDataRequest} from '../api/HttpClientInstance'
import { refreshToken } from '../services/TokenRefresh'

export enum PrefActionType {
  CHANGE_DATA = 'pref/CHANGE_DATA',
  RETRIEVE_DATA= 'pref/RETRIEVE_DATA'
}

export interface IMyData {
  nickname: string
  email: string
}

export interface ISendData {
  nickname: string
  email: string
}

export type postedUserAction = Action<PrefActionType.CHANGE_DATA, IUserPreference>

export type PrefActions = postedUserAction | getUserAction
export type getUserAction = Action<PrefActionType.RETRIEVE_DATA, IUserPreference>
export const postUserAction = actionCreator<PrefActionType.CHANGE_DATA, IUserPreference>(PrefActionType.CHANGE_DATA)

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

export const changeMyData = (payload: IMyData) => async (dispatch:Dispatch<postedUserAction>): Promise<void> => {

  try {
    const result = await workWithMyDataRequest.saveData(payload)
    dispatch(postUserAction(result))
  } catch (e) {
    console.log('Error:', e)
  }
}

