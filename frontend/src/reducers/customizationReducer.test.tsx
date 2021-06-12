import { CustomizationType } from '../actions/customizationActions'
import reducer, {initialState} from './customizationReducer'

describe('customizationReducer', () => {
  it('should handle SET_USER_CUSTOMIZATION', () => {
    expect(
      reducer(initialState, {
        type: CustomizationType.SET_USER_CUSTOMIZATION,
        payload: {
          sendEmailsWithNews: false,
          sendUpdatesThreads: false,
          sendUserReviews: true,
          sendUserQuestsReviews: false,
          sendUpdatesMessages: false,
          timezone: 'GMT',
          aboutUser: 'hehe',
          error: '',
          init: false,
          isLoading: false,
        
        }
      })
    ).toEqual({
      sendEmailsWithNews: false,
      sendUpdatesThreads: false,
      sendUserReviews: true,
      sendUserQuestsReviews: false,
      sendUpdatesMessages: false,
      timezone: 'GMT',
      aboutUser: 'hehe',
      error:  '',
      init: false,
      isLoading: false,
      status: ''
    }
    )
  })
})