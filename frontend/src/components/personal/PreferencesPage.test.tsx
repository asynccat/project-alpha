import * as React from 'react'
import {render, screen} from '@testing-library/react'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'

import PreferencesPage from './PreferencesPage'
import {store} from '../../index'



describe('Preferences', () => {
  it('renders App component', () => {
    render(<Provider store={store}><PreferencesPage /></Provider>)
    expect(screen.getByText(/CHANGE NICKNAME/i)).toBeInTheDocument()
  })

})

