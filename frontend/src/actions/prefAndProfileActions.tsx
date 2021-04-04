import {Dispatch} from 'redux'

import {Action} from '../types/action'
import {ChangeMyDataRequest} from '../api/ChangeMyDataRequest'
import {actionCreator} from '../redux-utils/actionCreator'
import {IUserPreference} from '../models/user'


export enum PrefActionType {
  CHANGE_DATA = 'pref/CHANGE_DATA',
  RETRIEVE_DATA= 'pref/RETRIEVE_DATA'
}

export interface IMyData {
    username: string
    address: string
    jobTitle: string
    company: string
}

export interface IChangeMyData {
    saveData: (payload: IMyData) => Promise<IMyData>
}

export type postedUserAction = Action<PrefActionType.CHANGE_DATA, IUserPreference>
export const postUserAction = actionCreator<PrefActionType.CHANGE_DATA, IUserPreference>(PrefActionType.CHANGE_DATA)

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
