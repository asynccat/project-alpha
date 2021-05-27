import * as React from 'react'
import { render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'

import {store} from '../../index'
import PasswordChangeForm from './PasswordChangeForm'
import * as prefActions from '../../actions/prefAndProfileActions'

describe('PasswordChangeForm', () => {
  it('title in place', () => {
    render(<Provider store={store}><PasswordChangeForm /></Provider>)
    expect(screen.getByText(/Change Password/)).toBeInTheDocument()
    expect(screen.getByText(/Change Password/)).toBeInTheDocument()
    expect(screen.getByLabelText(/New Password/)).toBeInTheDocument()
  })
  it('rendering and submitting a basic Formik form, call updateUserPassword on submitting form', async () => {
    render(<Provider store={store}><PasswordChangeForm /></Provider>)
    const updateUserPasswordMock = jest
    .spyOn(prefActions, 'updateUserPassword')
      
    .mockImplementationOnce(() => Promise.resolve())
  
    userEvent.type(screen.getByLabelText(/Old Password/i), '1234')
    userEvent.type(screen.getByLabelText(/New Password/i), '22')
    userEvent.type(screen.getByLabelText(/Confirm Password/i), '22')
  
    userEvent.click(screen.getByTestId(/submitButton/i ))
  
    await waitFor(() =>
      expect(updateUserPasswordMock).toHaveBeenCalledWith({
        oldPassword: '1234',
        newPassword: '22',
        confirmPassword: '22'
      })
    )
    await waitFor(() =>
    expect(updateUserPasswordMock).toBeCalled()
  )
  })
  it('Formik validation fails if new password and confirm password not match', async () => {
    render(<Provider store={store}><PasswordChangeForm /></Provider>)
    userEvent.type(screen.getByLabelText(/Old Password/i), '1234')
    userEvent.type(screen.getByLabelText(/New Password/i), '22')
    userEvent.type(screen.getByLabelText(/Confirm Password/i), '32')
  
    userEvent.click(screen.getByTestId(/submitButton/i ))
   
   await waitFor(() => {
      
  
      expect(screen.getByText('Passwords do not match')).not.toBeNull()
    })
  })

  it('Formik validation fails if old password is same as new one', async () => {
    render(<Provider store={store}><PasswordChangeForm /></Provider>)
    userEvent.type(screen.getByLabelText(/Old Password/i), '1234')
    userEvent.type(screen.getByLabelText(/New Password/i), '1234')
    userEvent.type(screen.getByLabelText(/Confirm Password/i), '1234')
  
    userEvent.click(screen.getByTestId(/submitButton/i ))
   
    await waitFor(() => {
      expect(screen.getByText('Old and new passwords must be different')).not.toBeNull()
    })
  })

})



