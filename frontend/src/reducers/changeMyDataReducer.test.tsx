import {PrefActionType} from '../actions/prefAndProfileActions'
import reducer, {initialState} from './changeMyDataReducer'

describe('changeMyDataReducer', () => {
  it('should handle RETRIEVE_DATA', () => {
    expect(
      reducer(initialState, {
        type: PrefActionType.RETRIEVE_DATA,
        payload: {
            nickname: 'kate',
            email: 'test@email.com',
        }
      })
    ).toEqual({
            nickname: 'kate',
            email: 'test@email.com',
    }
    )
  })
})