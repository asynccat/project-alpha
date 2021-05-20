import {PrefActionType} from '../actions/prefAndProfileActions'
import reducer, {initialState} from './operatePreferencesDataReducer'

describe('operatePreferencesDataReducer', () => {
  it('should handle SET_USER_PREFERENCES', () => {
    expect(
      reducer(initialState, {
        type: PrefActionType.SET_USER_PREFERENCES,
        payload: {
            nickname: 'kate',
            email: 'test@email.com',
            error: '',
            init: false,
            isLoading: false,
        
        }
      })
    ).toEqual({
            nickname: 'kate',
            email: 'test@email.com',
            error: '',
            init: false,
            isLoading: false,
            status: ''
    }
    )
  })
})