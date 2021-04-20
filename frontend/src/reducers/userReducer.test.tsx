import reducer, {initialState} from './userReducer'
import {AuthActionType} from '../actions/authActions'

describe('user reducer', () => {
  it('should handle user signing up', () => { 
    expect(
      reducer(initialState, {
        type: AuthActionType.SET_USER,
        payload: 'test@email.com',
      })
    ).toEqual(
      {
        loggedIn: true,
      }
    )
})
})

