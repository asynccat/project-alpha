import userReducer from './userReducer'

export const rootReducer = userReducer

export type RootState = ReturnType<typeof rootReducer>
