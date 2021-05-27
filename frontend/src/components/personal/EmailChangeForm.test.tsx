import * as React from 'react'
import { render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'

import {store} from '../../index'
import EmailChangeForm from './EmailChangeForm'

describe('EmailChangeForm', () => {
  it('title in place', () => {
    render(<Provider store={store}><EmailChangeForm /></Provider>)
    expect(screen.getByText(/CHANGE EMAIL/i)).toBeInTheDocument()

  })
  
  it('Formik validation fails if new email is not an email', async () => {
    render(<Provider store={store}><EmailChangeForm /></Provider>)
    userEvent.type(screen.getByLabelText(/email/i), '1234')
     
    userEvent.click(screen.getByTestId(/sbmtEmail/i))
   
   await waitFor(() => {
      
  
      expect(screen.getByText('This is not email')).not.toBeNull()
    })
  })

})
