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
            error:  '',
            init: false,
            isLoading: false,
            status: ''
    }
    )
  })
  it('should handle REQUEST_FAILED', () => {
    expect(
      reducer(initialState, {
        type: PrefActionType.REQUEST_FAILED,
        payload: {
          email: 'test@email.com',
          error: '',
          nickname: 'kate',
          status: '',
          isLoading: false,

        }
      })
    ).toEqual({
            nickname: '',
            email: '',
            avatar: '',
            error: {
              email: 'test@email.com',
              nickname: 'kate',
              isLoading: false,
              status: '',
              error: ''
            },
            init: false,
            isLoading: false,
            status: ''

    }
    )
  })
  it('should handle CHANGE_PASSWORD', () => {
    expect(
      reducer(initialState, {
        type: PrefActionType.CHANGE_PASSWORD,
        payload: {
         oldPassword: '22',
         newPassword: '33',
         confirmPassword: '33'

        }
      })
    ).toEqual({
            status: 'success',
            email: '',
            error: '',
            avatar: '',
           init: false,
            isLoading: false,
            nickname: '',
            status:  {
            confirmPassword: '33',
            newPassword: '33',
            oldPassword: '22',
            },
        
    }
    )
  })
})