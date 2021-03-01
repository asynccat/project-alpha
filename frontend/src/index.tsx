import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import './index.scss';
import {applyMiddleware, combineReducers, createStore} from "redux";
import counterReducer from "./reducers/counterReducer";
import {authReducer} from "./reducers/authReducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

let rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
  <div>
      <Provider store={store}>
    <App />
      </Provider>
  </div>,
  document.getElementById('root')
);
