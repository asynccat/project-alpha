import * as React from 'react'
import { render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'

import {store} from '../../../index'
import PreferencesNotificationForm from './NotificationForm'
import * as NotificationActions from '../../../actions/notificationActions'

describe('Notification Form', () => {
  it('title in place', () => {
    render(<Provider store={store}><PreferencesNotificationForm /></Provider>)
    expect(screen.getByText(/My Timezone/)).toBeInTheDocument()
    expect(screen.getByText(/Send me emails about updates in/)).toBeInTheDocument()
    expect(screen.getByText(/About me/)).toBeInTheDocument()
  })

  it('rendering and submitting a basic Formik form, call successChangeUserNotification on submitting form', 
    async () => {
      render(<Provider store={store}><PreferencesNotificationForm /></Provider>)
      const updateNotificationMock = jest
      .spyOn(NotificationActions, 'successChangeUserNotification')
        
      .mockImplementationOnce(() => Promise.resolve())
    
      userEvent.type(screen.getByLabelText(/Send me emails with news from project alpha/i), 'true')
      userEvent.click(screen.getByTestId('submit-notification-button'))
    
      await waitFor(() =>
        expect(updateNotificationMock).toBeCalled()
    )

    await waitFor(() =>
        expect(updateNotificationMock).toHaveBeenCalledWith({
          sendEmailsWithNews: true,
          sendUpdatesThreads: false,
          sendUserReviews: true,
          sendUserQuestsReviews: false,
          sendUpdatesMessages: false,
          timezone: 'GMT',
          aboutUser: '' 
        })
)
})
})