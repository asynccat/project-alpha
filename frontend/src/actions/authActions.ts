import {Dispatch} from 'redux'
import { push, CallHistoryMethodAction } from 'connected-react-router'

import {actionCreator} from '../redux-utils/actionCreator'
import {Action} from '../types/action'
import {AuthApiClient } from '../api/authRequest'
import {IUser} from '../models/user'

export enum AuthActionType {
  LOG_OUT = 'auth/LOG_OUT',
  SET_USER = 'auth/SET_USER'
}

export interface IUserDetails {
  email: string
  password: string
}

export interface IUserAuthApiResponse {
  access: string
  email: string
  id: number
  token : {
    access: string
    refresh: string
    raw: string
    payload: {
        exp: number
        id: number
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  split: any
}

export type fetchUserAction = Action<AuthActionType.SET_USER, IUser>
export type logoutUserAction = Action<AuthActionType.LOG_OUT>

export type AuthActions = fetchUserAction | logoutUserAction

export const setUserAction = actionCreator<AuthActionType.SET_USER, IUser>(AuthActionType.SET_USER)

export const logoutAction = actionCreator<AuthActionType.LOG_OUT>(AuthActionType.LOG_OUT)

export const signUserUp = (payload: IUserDetails) => 
  async (dispatch:Dispatch<fetchUserAction | CallHistoryMethodAction >): Promise<void> => {
    const authApiClient = new AuthApiClient()

    try {
      const result = await authApiClient.register(payload)
      localStorage.setItem('token', result.token.access)
      dispatch(setUserAction(result))
      dispatch(push('/welcome'))
    } catch (e) {
      alert(e.message)
    }
}

export const login = (payload: IUserDetails) => 
  async (dispatch:Dispatch<fetchUserAction | CallHistoryMethodAction >): Promise<void> => {
    const authApiClient = new AuthApiClient()

    try {
      const result = await authApiClient.login(payload)
      localStorage.setItem('token', result.access)
      dispatch(setUserAction(result))
      dispatch(push('/welcome'))
    } catch (e) {
      alert(e.message)
    }
}

export const userLogOut = () => (dispatch: Dispatch<logoutUserAction | CallHistoryMethodAction>): void => {

  try {
    localStorage.removeItem('token')
    dispatch(logoutAction())
    dispatch(push('/login'))
  } catch (e) {
    alert(e.message)
  }
}

// TODO: action - token refresh