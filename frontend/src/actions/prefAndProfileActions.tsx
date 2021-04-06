import {Dispatch} from 'redux'

import {Action} from '../types/action'
import {ChangeMyDataRequest} from '../api/ChangeMyDataRequest'
import {actionCreator} from '../redux-utils/actionCreator'
import {IUserPreference} from '../models/user'
import {InquiryMyDataRequest} from '../api/InquiryMyDataRequest'


export enum PrefActionType {
  CHANGE_DATA = 'pref/CHANGE_DATA',
  RETRIEVE_DATA= 'pref/RETRIEVE_DATA'
}

export interface IMyData {
    nickname: string
    email: string
    id: string
}

export interface IChangeMyData {
    saveData: (payload: IMyData) => Promise<IMyData>
}

export interface IInquiryMyData {
  getData: () => Promise<IMyData>
}
export type postedUserAction = Action<PrefActionType.CHANGE_DATA, IUserPreference>

export type PrefActions = postedUserAction | getUserAction
export type getUserAction = Action<PrefActionType.RETRIEVE_DATA, IUserPreference>
export const postUserAction = actionCreator<PrefActionType.CHANGE_DATA, IUserPreference>(PrefActionType.CHANGE_DATA)

export const getInqUserAction = actionCreator<PrefActionType.RETRIEVE_DATA, 
IUserPreference>(PrefActionType.RETRIEVE_DATA)

export const getMyData = () => async (dispatch:Dispatch<getUserAction>): Promise<void> => {
  const inquiryMyDataRequest = new InquiryMyDataRequest()

  try {
    const result = await inquiryMyDataRequest.getData()
    dispatch(getInqUserAction(result))
  } catch (e) {
    console.log('Error:', e)
  }
}

export const changeMyData = (payload: IMyData) => async (dispatch:Dispatch<postedUserAction>): Promise<void> => {
  const changeMyDataRequest = new ChangeMyDataRequest()

  try {
    const result = await changeMyDataRequest.saveData(payload)
    console.log(result)
    dispatch(postUserAction(result))
  } catch (e) {
    console.log('Error:', e)
  }
}

