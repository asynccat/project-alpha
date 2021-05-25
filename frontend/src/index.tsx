import React from 'react'
import ReactDOM from 'react-dom'
import { routerMiddleware } from 'connected-react-router'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import logger from 'redux-logger'

import {history} from './history'
import './index.scss'
import App from './App'
import {rootReducer} from './reducers/index'

const middleWares = [routerMiddleware(history), thunk]
if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger)
}

export const store = createStore(rootReducer(history),
composeWithDevTools(
  applyMiddleware(...middleWares))
)

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
          <App />
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root') || document.createElement('div') // for testing purposes
)