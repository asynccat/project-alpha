import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {rootReducer} from './reducers/index'

const store = createStore(rootReducer, applyMiddleware(thunk))
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
)