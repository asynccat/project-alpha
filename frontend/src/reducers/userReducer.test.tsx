import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import reducer, {defaultState} from './userReducer'
import {SET_USER} from '../actions/authActions'



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