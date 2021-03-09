export type Action<ActionType extends string, PayloadType = void> = {
  type: ActionType
  payload: PayloadType
}