import {Dispatch} from 'redux'

import {actionCreator} from '../redux-utils/actionCreator'
import {Action} from '../types/action'
import {AuthApiClient } from '../api/authRequest'

export enum AuthActionType {
  LOG_OUT = 'auth/LOG_OUT',
  SET_USER = 'auth/SET_USER'
}

export interface IUserDetails {
  email: string
  password: string
}

export interface IReq {
  token:string 
  user: string
}

export type fetchUserAction = Action<AuthActionType.SET_USER, IUserDetails>
export type logoutUserAction = Action<AuthActionType.LOG_OUT>

export type AuthActions = fetchUserAction | logoutUserAction

export const setUserAction = actionCreator<AuthActionType.SET_USER, IUserDetails>(AuthActionType.SET_USER)

// TODO: localStorage.clear()
export const logoutAction = actionCreator<AuthActionType.LOG_OUT>(AuthActionType.LOG_OUT)

export const signUserUp = async (payload: IUserDetails,  dispatch:Dispatch<fetchUserAction>): Promise<IReq>  => {
  const authApiClient = new AuthApiClient()

  try {
    const result = await authApiClient.register(payload)
    localStorage.setItem('token', result.token)
    dispatch(setUserAction(result.user))
  } catch (e) {
    console.log('Error:', e)
  }
}

export const login = async (payload: IUserDetails, dispatch:Dispatch<fetchUserAction>): Promise<IReq> => {
  const authApiClient = new AuthApiClient()

  try {
    const result = await authApiClient.login(payload)
    localStorage.setItem('token', result.token)
    dispatch(setUserAction(result.user))
  } catch (e) {
    console.log('Error:', e)
  }
}

// TODO: action - token refresh