import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'

import {store} from '../../../index'
import {AchievementsBoard} from './Achievements'

describe('NotificationForm', () => {
  it('title in place', () => {
    render(<Provider store={store}><AchievementsBoard /></Provider>)
    expect(screen.getByText(/Achievements/)).toBeInTheDocument()
  })
})



