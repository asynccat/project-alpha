import { CounterTypes, CounterState, CounterActions } from '../actions';
import { Action } from 'redux';

const initialState: CounterState | any = {
  count: 0,
};

export default function counterReducer(
  state: CounterState = initialState,
  action: Action | CounterActions
) {
  switch (action.type) {
    case CounterTypes.INCREASE_COUNT:
      return { ...state, count: state.count + 1 };
    case CounterTypes.DECREASE_COUNT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}