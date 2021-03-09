import {CounterActions, CounterTypes} from './authActions'

export const increaseCount = (): CounterActions => ({
  type: CounterTypes.INCREASE_COUNT,
})

export const decreaseCount = (): CounterActions => ({
  type: CounterTypes.DECREASE_COUNT,
})