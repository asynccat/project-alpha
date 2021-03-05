import * as React from 'react'
import {render} from '@testing-library/react'
import App from './App'
import reducer from './reducers/userReducer'

describe('App', () => {
  it('renders App component', () => {
    render(<App />)
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
  })
})

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        loggedIn: false,
        user: {},
      }
    ])
  })
})