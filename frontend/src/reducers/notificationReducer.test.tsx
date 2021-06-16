import { NotificationType } from '../actions/notificationActions'
import reducer from './notificationReducer'

describe('customizationReducer', () => {
  it('should handle SET_USER_CUSTOMIZATION', () => {
    const initialState = {
        sendEmailsWithNews: false,
        sendUpdatesThreads: false,
        sendUserReviews: true,
        sendUserQuestsReviews: false,
        sendUpdatesMessages: true,
        timezone: 'UTC',
        aboutUser: '',
        error: '',
        init: false,
        isLoading: false,
        status: ''
    }

    expect(
      reducer(initialState, {
        type: NotificationType.SET_USER_NOTIFICATION,
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
          status: ''
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