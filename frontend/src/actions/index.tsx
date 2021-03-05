import { Action } from 'redux'

export enum CounterTypes {
  INCREASE_COUNT = 'INCREASE_COUNT',
  DECREASE_COUNT = 'DECREASE_COUNT',
}

export interface CounterState {
  count: number
}

export interface IncrementAction extends Action {
  type: CounterTypes.INCREASE_COUNT
}

export interface DecrementAction extends Action {
  type: CounterTypes.DECREASE_COUNT
}

export type CounterActions = IncrementAction | DecrementAction

export const SET_USER = 'SET_USER'
export const LOG_OUT = 'LOG_OUT'

export interface UserDetailsOnRegister {
  email: string
  username: string
  password: string
}

export interface UserDetailsOnLogin {
  email: string
  password: string
}

export interface fetchUserAction {
  type: typeof SET_USER
  payload: UserDetailsOnRegister | UserDetailsOnLogin
}

export interface loggedoutUser {
  type: typeof LOG_OUT
  payload: null
}

export type ActionsOfUser = fetchUserAction | loggedoutUser