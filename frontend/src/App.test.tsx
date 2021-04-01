import * as React from 'react'
import {render, screen} from '@testing-library/react'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'

import App from './App'
import {store} from './index'

describe('App', () => {
  it('renders App component', () => {
    render(<Provider store={store}><App /></Provider>)
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
  })
})
