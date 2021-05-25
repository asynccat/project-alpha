import * as React from 'react'
import {render, screen} from '@testing-library/react'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'

import {store} from '../../index'
import PasswordChangeForm from './PasswordChangeForm'

describe('PasswordChangeForm', () => {
  it('title in place', () => {
    render(<Provider store={store}><PasswordChangeForm /></Provider>)
    expect(screen.getByText(/Change Password/)).toBeInTheDocument()
  })

})