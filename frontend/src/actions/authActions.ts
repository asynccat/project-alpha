import {Dispatch} from 'redux'
import { push } from 'connected-react-router'

import {actionCreator} from '../redux-utils/actionCreator'
import {Action} from '../types/action'
import {AuthApiClient } from '../api/authRequest'
import {IUser} from '../models/user'
import {TokenStorage} from '../services/TokenStorage'
import {jwtDecode, IToken, autoRefresh } from '../services/TokenRefresh'
import { MILLISECONDS_IN_SECOND, TEN_SECONDS_BEFORE_TOKEN_EXPIRE} from '../constants/valuableNumbers'
import { errorHandler } from '../services/ErrorHandler'

export enum AuthActionType {
  LOG_OUT = 'auth/LOG_OUT',
  SET_USER = 'auth/SET_USER'
}

export interface IUserDetails {
  email: string
  password: string
}

export interface IUserAuthApiRegisterResponse {
  token : {
    access: string
    refresh: string
  }
  id: number
}

export interface IUserAuthApiLoginResponse {
    access: string
    refresh: string
    id: number
}

export type fetchUserAction = Action<AuthActionType.SET_USER, IUser>
export type logoutUserAction = Action<AuthActionType.LOG_OUT>

export type AuthActions = fetchUserAction | logoutUserAction

export const setUserAction = actionCreator<AuthActionType.SET_USER, IUser>(AuthActionType.SET_USER)

export const logoutAction = actionCreator<AuthActionType.LOG_OUT>(AuthActionType.LOG_OUT)

export const signUserUp = (payload: IUserDetails) => 
  async (dispatch:Dispatch): Promise<void> => {
    const authApiClient = new AuthApiClient()

    try {
      const result = await authApiClient.register(payload)
      const tokenStorage = new TokenStorage()
      tokenStorage.saveToken(result.token.access)
      tokenStorage.saveRefreshToken(result.token.refresh)
      const wholeToken: IToken  = jwtDecode(result.token.access)
      const user = {
        id: wholeToken.payload.user_id
      }
      const expirationTime = ((wholeToken.payload.exp*MILLISECONDS_IN_SECOND) - Date.now() - 
      TEN_SECONDS_BEFORE_TOKEN_EXPIRE)
      autoRefresh(expirationTime)
      dispatch(setUserAction(user))
      dispatch(push('/welcome'))
    } catch (error) {
      errorHandler(error, dispatch)
    }
  }

export const login = (payload: IUserDetails) => 
  async (dispatch:Dispatch): Promise<void> => {
    const authApiClient = new AuthApiClient()

    try {
      const result = await authApiClient.login(payload)
      const tokenStorage = new TokenStorage()
      tokenStorage.saveToken(result.access) 
      tokenStorage.saveRefreshToken(result.refresh)
      const wholeToken: IToken  = jwtDecode(result.access)
      const user = {
        id: wholeToken.payload.user_id
      }
      const expirationTime = ((wholeToken.payload.exp*MILLISECONDS_IN_SECOND) - Date.now() - 
      TEN_SECONDS_BEFORE_TOKEN_EXPIRE)
      autoRefresh(expirationTime)
      dispatch(setUserAction(user))
      dispatch(push('/welcome'))
    } catch (error) {
      errorHandler(error, dispatch)
    }
}

export const userLogOut = () => (dispatch: Dispatch): void => {

  try {
    const tokenStorage = new TokenStorage()
    tokenStorage.removeToken()
    dispatch(logoutAction())
    dispatch(push('/login'))
  } catch (error) {
    errorHandler(error, dispatch)
    }
  }
