/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Dispatch} from 'redux'

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
  user: IUser
}

export type fetchUserAction = Action<AuthActionType.SET_USER, IUser>
export type logoutUserAction = Action<AuthActionType.LOG_OUT>

export type AuthActions = fetchUserAction | logoutUserAction

export const setUserAction = actionCreator<AuthActionType.SET_USER, IUser>(AuthActionType.SET_USER)

// TODO: localStorage.clear()
export const logoutAction = actionCreator<AuthActionType.LOG_OUT>(AuthActionType.LOG_OUT)

export const signUserUp = (payload: IUserDetails): Promise<void> => 
// @ts-ignore
async (dispatch:Dispatch<fetchUserAction>) => {
  const authApiClient = new AuthApiClient()

  try {
    const result = await authApiClient.register(payload)
    localStorage.setItem('token', result.token)
    dispatch(setUserAction(result.user))
  } catch (e) {
    console.log('Error:', e)
  }
}

export const login = (payload: IUserDetails): Promise<void> => 
// @ts-ignore
async (dispatch:Dispatch<fetchUserAction>) => {
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