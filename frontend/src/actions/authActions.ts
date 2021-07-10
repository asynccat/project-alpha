import {Dispatch} from 'redux'
import { push, CallHistoryMethodAction } from 'connected-react-router'
import { toast } from 'react-toastify'

import {actionCreator} from '../redux-utils/actionCreator'
import {Action} from '../types/action'
import {AuthApiClient } from '../api/authRequest'
import {IUser} from '../models/user'
import {TokenStorage} from '../services/TokenStorage'
import {jwtDecode, IToken, autoRefresh } from '../services/TokenRefresh'
import { MILLISECONDS_IN_SECOND, TEN_SECONDS_BEFORE_TOKEN_EXPIRE} from '../constants/valuableNumbers'
import {errorMessage } from '../constants/errorAndSuccessMessages'
import { achievementMessage } from '../constants/achievementMessages'
import { emailFormatIsValid } from '../utils/FormatVerifications'

export enum AuthActionType {
  LOG_OUT = 'auth/LOG_OUT',
  SET_USER = 'auth/SET_USER',
  RECEIVE_RECOVERY_MESSAGE = 'auth/RECEIVE_RECOVERY_MESSAGE'
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

export interface IUserEmail {
  email: string
}

export interface IMessageResponse {
  message: string
  error: boolean
}

export type fetchUserAction = Action<AuthActionType.SET_USER, IUser>
export type logoutUserAction = Action<AuthActionType.LOG_OUT>
export type receiveRecoveryMessageAction = Action<AuthActionType.RECEIVE_RECOVERY_MESSAGE, IMessageResponse>

export type AuthActions = fetchUserAction | logoutUserAction | receiveRecoveryMessageAction

export const setUserAction = actionCreator<AuthActionType.SET_USER, IUser>(AuthActionType.SET_USER)
export const logoutAction = actionCreator<AuthActionType.LOG_OUT>(AuthActionType.LOG_OUT)
export const receiveRecoveryMessageActionValue =
  actionCreator<AuthActionType.RECEIVE_RECOVERY_MESSAGE, IMessageResponse>(AuthActionType.RECEIVE_RECOVERY_MESSAGE)

export const signUserUp = (payload: IUserDetails) => 
  async (dispatch:Dispatch<fetchUserAction | CallHistoryMethodAction >): Promise<void> => {
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
      toast.info(achievementMessage.register)
    } catch (error) {
      handleError(error)
    }
  }

export const login = (payload: IUserDetails) => 
  async (dispatch:Dispatch<fetchUserAction | CallHistoryMethodAction >): Promise<void> => {
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
      handleError(error)
    }
}

export const userLogOut = () => (dispatch: Dispatch<logoutUserAction | CallHistoryMethodAction>): void => {

  try {
    const tokenStorage = new TokenStorage()
    tokenStorage.removeToken()
    dispatch(logoutAction())
    dispatch(push('/login'))
  } catch (error) {
    handleError(error)
    }
}

export const recover = (payload: IUserEmail) =>
  async (dispatch: Dispatch<receiveRecoveryMessageAction | CallHistoryMethodAction>): Promise<void> => {
    const authApiClient = new AuthApiClient()
    try {
      const {email} = payload
      if (emailFormatIsValid(email)) {
        const result = await authApiClient.recover(payload)
        const {message} = result
        dispatch(receiveRecoveryMessageActionValue({message: message, error: false}))
      } else {
        dispatch(receiveRecoveryMessageActionValue({message: 'Invalid e-mail format.', error: true}))
      }
    } catch (error) {
      // handleError(error)
      dispatch(receiveRecoveryMessageActionValue({message: 'Request failed.', error: true}))
    }
  }

  const handleError = (error: { message: string }) => {
    const destructuredMessage = JSON.parse(error.message)
      if (destructuredMessage) {
        const [messageArrayFromDestructuredError] = destructuredMessage.errors
        const errorText = (messageArrayFromDestructuredError.message).toString()
        toast.error(errorText)
      } else {
        toast.error(errorMessage.errorUnknown)
      }
  }
