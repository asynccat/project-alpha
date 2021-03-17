/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import App from './App'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {rootReducer} from './reducers/index'

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root') || document.createElement('div') // for testing purposes
)