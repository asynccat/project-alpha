export type Action<ActionType, PayloadType = void> = {
  type: ActionType
  payload?: PayloadType
}