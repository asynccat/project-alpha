import {CounterActions, CounterTypes} from './index'

export const increaseCount = (): CounterActions => ({
  type: CounterTypes.INCREASE_COUNT,
})

export const decreaseCount = (): CounterActions => ({
  type: CounterTypes.DECREASE_COUNT,
})