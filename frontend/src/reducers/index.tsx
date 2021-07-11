/* eslint-disable @typescript-eslint/ban-ts-comment */
import userReducer from './userReducer'
import operatePreferencesDataReducer from './operatePreferencesDataReducer'
import notificationReducer from './notificationReducer'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import {store} from '../index'

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    userReducer,
    operatePreferencesDataReducer,
    notificationReducer
})

export type RootState = ReturnType<typeof store.getState>
