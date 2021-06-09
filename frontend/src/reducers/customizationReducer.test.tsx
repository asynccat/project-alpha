import { CustomizationType } from '../actions/customizationActions'
import reducer, {initialState} from './customizationReducer'

describe('operatePreferencesDataReducer', () => {
  it('should handle SET_USER_CUSTOMIZATION', () => {
    expect(
      reducer(initialState, {
        type: CustomizationType.SET_USER_CUSTOMIZATION,
        payload: {
          emailNews: true, 
          emailThreads: true,
          emailMyReviews: true,
          emailQuestReviews: true,
          emailMessages: true,
          timeZone: 'GMT',
          aboutMe: 'hehe',
          error: '',
          init: false,
          isLoading: false,
        
        }
      })
    ).toEqual({
      emailNews: true, 
      emailThreads: true,
      emailMyReviews: true,
      emailQuestReviews: true,
      emailMessages: true,
      timeZone: 'GMT',
      aboutMe: 'hehe',
      error:  '',
      init: false,
      isLoading: false,
      status: ''
    }
    )
  })
})