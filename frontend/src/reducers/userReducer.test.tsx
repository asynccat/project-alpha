import reducer, {initialState} from './userReducer'
import {AuthActionType} from '../actions/authActions'

describe('user reducer', () => {
  it('should handle user signing up', () => { 
    expect(
      reducer(initialState, {
        type: AuthActionType.SET_USER,
        payload: {email: 'test@email.com'},
      })
    ).toEqual(
      {
        loggedIn: true,
      }
    )
})
it('should handle user log out', () => { 
  expect(
    reducer(initialState, {
      type: AuthActionType.LOG_OUT,
      payload: '',
    })
  ).toEqual(
    {
      loggedIn: false,
    }
  )
})
})

