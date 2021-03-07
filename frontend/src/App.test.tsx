import * as React from 'react'
import {render, screen} from '@testing-library/react'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom/extend-expect'

import App from './App'
import reducer, {defaultState} from './reducers/userReducer'
import {store} from './index'
import {SET_USER} from './actions/index'

describe('App', () => {
  it('renders App component', () => {
    render(<Provider store={store}><App /></Provider>)
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
  })
})

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(defaultState, {})).toEqual(
      {
        loggedIn: false,
        user: {},
      }
    )
  })
  it('should handle user signing up', () => {
    expect(
      reducer(defaultState, {
        type: SET_USER,
        user: {},
      })
    ).toEqual(
      {
        loggedIn: true,
        user: {}
      }
    )
})
})
