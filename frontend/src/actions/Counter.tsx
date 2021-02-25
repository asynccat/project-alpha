import { CounterTypes } from './index';

export const increaseCount = () => ({
  type: CounterTypes.INCREASE_COUNT,
});

export const decreaseCount = () => ({
  type: CounterTypes.DECREASE_COUNT,
});