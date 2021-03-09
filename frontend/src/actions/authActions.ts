import {Dispatch} from 'redux'
import {actionCreator} from '../redux-utils/actionCreator'
import {Action} from '../types/action'
import {config} from '../config'

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


const baseURL = `${config.baseUrl}${config.apiV1}`

export const setUserAction = actionCreator<AuthActionType.SET_USER, IUserDetails>(AuthActionType.SET_USER)

// TODO: localStorage.clear()
export const logoutAction = actionCreator<AuthActionType.LOG_OUT>(AuthActionType.LOG_OUT)

function authRequest(url: string,userInfo: IUserDetails) {
  return fetch(`${baseURL}/${url}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
}


export const signUserUp = (userInfo: IUserDetails) => async (dispatch:Dispatch<fetchUserAction>): Promise<void> => {
  try {
    const response = await authRequest('sign-up', userInfo)
    const result = await response.json()
    localStorage.setItem('token', result.token)
    dispatch(setUserAction(result.user))
  } catch (e) {
    console.log('Error:', e)
  }
}

export const login = (userInfo: IUserDetails) => async (dispatch:Dispatch<fetchUserAction>): Promise<void> => {
  try {
    const response = await fetch(`${baseURL}/token/`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
    const result = await response.json()
    localStorage.setItem('token', result.token)
    dispatch(setUserAction(result.user))
  } catch (e) {
    console.log('Error:', e)
  }
}


// TODO: action - token refresh