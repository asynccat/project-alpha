/* eslint-disable @typescript-eslint/ban-ts-comment */
import userReducer from './userReducer'
import changeMyDataReducer from './changeMyDataReducer'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    userReducer,
    changeMyDataReducer,
})

export type RootState = ReturnType<typeof rootReducer>
