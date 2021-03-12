import {Dispatch} from 'redux'
import {actionCreator} from '../redux-utils/actionCreator'
import {Action} from '../types/action'
import {authRequest} from '../api/authRequest'

export enum AuthActionType {
  LOG_OUT = 'auth/LOG_OUT',
  SET_USER = 'auth/SET_USER'
}

export interface IUserDetails {
  email: string
  password: string
}

export type fetchUserAction = Action<AuthActionType.SET_USER, IUserDetails>
export type logoutUserAction = Action<AuthActionType.LOG_OUT>

export type AuthActions = fetchUserAction | logoutUserAction

export const setUserAction = actionCreator<AuthActionType.SET_USER, IUserDetails>(AuthActionType.SET_USER)

// TODO: localStorage.clear()
export const logoutAction = actionCreator<AuthActionType.LOG_OUT>(AuthActionType.LOG_OUT)

export const signUserUp = (payload: IUserDetails) =>
  async (dispatch:Dispatch<fetchUserAction>): Promise<void> => {
  try {
    const response = await authRequest('sign-up', 'POST', payload)
    const result = await response.json()
    localStorage.setItem('token', result.token)
    dispatch(setUserAction(result.user))

  } catch (e) {
    console.log('Error:', e)
  }
}

export const login = (payload: IUserDetails) => 
async (dispatch:Dispatch<fetchUserAction>): Promise<void> => {
  try {
    const response = await authRequest('token', 'POST', payload)
    const result = await response.json()
    localStorage.setItem('token', result.token)
    dispatch(setUserAction(result.user))
  } catch (e) {
    console.log('Error:', e)
  }
}


// TODO: action - token refresh