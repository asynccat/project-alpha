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

export type CounterActions = IncrementAction | DecrementAction;