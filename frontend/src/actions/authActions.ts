import { Action } from 'redux'

export enum AuthActionType {
  LOG_OUT = 'auth/LOG_OUT',
  SET_USER = 'auth/SET_USER'
}

export interface IUserDetails{
  email: string
  password: string
}


export interface fetchUserAction {
  type: typeof AuthActionType.SET_USER
  payload: IUserDetails
}

export interface loggedoutUser {
  type: typeof AuthActionType.LOG_OUT
  payload: null
}

export type ActionsOfUser = fetchUserAction | loggedoutUser