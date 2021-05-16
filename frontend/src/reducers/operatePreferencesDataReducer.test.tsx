import {PrefActionType} from '../actions/prefAndProfileActions'
import reducer, {initialState} from './operatePreferencesDataReducer'

describe('operatePreferencesDataReducer', () => {
  it('should handle RETRIEVE_DATA', () => {
    expect(
      reducer(initialState, {
        type: PrefActionType.RETRIEVE_DATA,
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
    }
    )
  })
})