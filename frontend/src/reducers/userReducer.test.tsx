import reducer, {initialState} from './userReducer'
import {AuthActionType} from '../actions/authActions'
import '@testing-library/jest-dom/'

describe('user reducer', () => {
  it('should return the initial state', () => {
    // Testing case when non-auth action applied
    // Disabling eslint and TS-check to avoid action type-check
    // eslint-disable-next-line
    // @ts-ignore
    expect(reducer(initialState, {})).toEqual(
      {
        loggedIn: false,
        email: '',
      }
    )
  })

  it('should handle user signing up', () => { 
    expect(
      reducer(initialState, {
        type: AuthActionType.SET_USER,
        payload: {
          email: 'test@email.com',
        },
      })
    ).toEqual(
      {
        loggedIn: true,
        email: 'test@email.com'
      }
    )
})
})

