import {Dispatch} from 'redux'
import { push } from 'connected-react-router'

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
  token: string
  access: string
  email: string
}

export type fetchUserAction = Action<AuthActionType.SET_USER, IUser>
export type logoutUserAction = Action<AuthActionType.LOG_OUT>

export type AuthActions = fetchUserAction | logoutUserAction

export const setUserAction = actionCreator<AuthActionType.SET_USER, IUser>(AuthActionType.SET_USER)

export const logoutAction = actionCreator<AuthActionType.LOG_OUT>(AuthActionType.LOG_OUT)

export const signUserUp = (payload: IUserDetails) => async (dispatch:Dispatch<fetchUserAction>): Promise<void> => {
  const authApiClient = new AuthApiClient()

  try {
    const result = await authApiClient.register(payload)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    localStorage.setItem('token', result.token.access)
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    dispatch(setUserAction(result.email))
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    dispatch(push('/welcome'))
  } catch (e) {
    alert(e.message)
  }
}

export const login = (payload: IUserDetails) => async (dispatch:Dispatch<fetchUserAction>): Promise<void> => {
  const authApiClient = new AuthApiClient()

  try {
    const result = await authApiClient.login(payload)
    const a = result.access
    localStorage.setItem('token', a)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    dispatch(setUserAction(result.email))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    dispatch(push('/welcome'))
  } catch (e) {
    alert(e.message)
  }
}

// TODO: action - token refresh