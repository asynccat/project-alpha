import * as React from 'react'
import {queryByText, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'

import {store} from '../../index'
import PasswordChangeForm from './PasswordChangeForm'
import {updateUserPassword} from '../../actions/prefAndProfileActions'

describe('PasswordChangeForm', () => {
  it('title in place', () => {
    render(<Provider store={store}><PasswordChangeForm /></Provider>)
    expect(screen.getByText(/Change Password/)).toBeInTheDocument()
    expect(screen.getByText(/Change Password/)).toBeInTheDocument()
    expect(screen.getByLabelText(/New Password/)).toBeInTheDocument()
  })

})


test('rendering and submitting a basic Formik form, call updateUserPassword on submitting form', () => {
  const onSubmit = jest.fn()
  render(<Provider store={store}><PasswordChangeForm /></Provider>)

  userEvent.type(screen.getByLabelText(/Old Password/i), '1234')
  userEvent.type(screen.getByLabelText(/New Password/i), '22')
  userEvent.type(screen.getByLabelText(/Confirm Password/i), '22')

  userEvent.click(screen.getByTestId(/submitButton/i ))

  waitFor(() =>
    expect(onSubmit).toHaveBeenCalled()
  )
  waitFor(() =>
    expect(onSubmit).toHaveBeenCalledWith({
      oldPassword: '1234',
      newPassword: '22',
      confirmPassword: '22'
    })
  )
  waitFor(() =>
    expect(updateUserPassword).toBeCalledWith(onSubmit)
)
})

test('Formik validation fails if new password and confirm password not match', () => {
  render(<Provider store={store}><PasswordChangeForm /></Provider>)
  userEvent.type(screen.getByLabelText(/Old Password/i), '1234')
  userEvent.type(screen.getByLabelText(/New Password/i), '22')
  userEvent.type(screen.getByLabelText(/Confirm Password/i), '32')

  userEvent.click(screen.getByTestId(/submitButton/i ))
 
 waitFor(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(queryByText('Passwords do not match')).not.toBeNull()
  })
})

test('Formik validation fails if old passowrd is same as new one', () => {
  render(<Provider store={store}><PasswordChangeForm /></Provider>)
  userEvent.type(screen.getByLabelText(/Old Password/i), '1234')
  userEvent.type(screen.getByLabelText(/New Password/i), '1234')
  userEvent.type(screen.getByLabelText(/Confirm Password/i), '1234')

  userEvent.click(screen.getByTestId(/submitButton/i ))
 
 waitFor(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(queryByText('Old and new passwords must be different')).not.toBeNull()
  })
})