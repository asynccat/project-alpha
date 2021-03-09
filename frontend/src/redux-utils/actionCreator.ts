import {Action} from '../types/action'

export function actionCreator<ActionType, PayloadType = void>(
  type: ActionType,
)  {
  return function(payload: PayloadType): Action<ActionType, PayloadType> {
    return {
      type, payload
    }
  }
}