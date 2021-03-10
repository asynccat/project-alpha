import {Dispatch} from 'redux'
import {actionCreator} from '../redux-utils/actionCreator'
import {Action} from '../types/action'
import {config} from '../config'
import {IWithHistory} from '../types/router'

export enum AuthActionType {
  LOG_OUT = 'auth/LOG_OUT',
  SET_USER = 'auth/SET_USER'
}

export interface IUserDetails {
  email: string
  password: string
}

type UserDetailsWithHistory = IUserDetails & IWithHistory

export type fetchUserAction = Action<AuthActionType.SET_USER, UserDetailsWithHistory>
export type logoutUserAction = Action<AuthActionType.LOG_OUT>

export type AuthActions = fetchUserAction | logoutUserAction


const baseURL = `${config.baseUrl}${config.apiV1}`

export const setUserAction = actionCreator<AuthActionType.SET_USER, UserDetailsWithHistory>(AuthActionType.SET_USER)

// TODO: localStorage.clear()
export const logoutAction = actionCreator<AuthActionType.LOG_OUT>(AuthActionType.LOG_OUT)

function authRequest(url: string, userInfo: IUserDetails) {
  return fetch(`${baseURL}/${url}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
}


export const signUserUp = (payload: UserDetailsWithHistory) =>
  async (dispatch:Dispatch<fetchUserAction>): Promise<void> => {
  const {history, password, email} = payload
  try {
    history.push('/welcome')
    const response = await authRequest('sign-up', {email, password})
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