import userReducer from './userReducer'
import changeMyDataReducer from './changeMyDataReducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    userReducer,
    changeMyDataReducer
})

export type RootState = ReturnType<typeof rootReducer>
