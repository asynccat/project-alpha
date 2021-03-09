import {Action} from '../types/action'

export enum AuthActionType {
  LOG_OUT = 'auth/LOG_OUT',
  SET_USER = 'auth/SET_USER'
}

export interface IUserDetails{
  email: string
  password: string
}


export type fetchUserAction = Action<AuthActionType.SET_USER, IUserDetails>
export type logoutUserAction = Action<AuthActionType.LOG_OUT>

export type AuthActions = fetchUserAction | logoutUserAction