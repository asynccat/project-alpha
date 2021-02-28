import * as React from 'react'
import {render, RenderResult, screen} from '@testing-library/react'
import App from './App'
import Counter from './components/counter/Counter'
import userEvent from '@testing-library/user-event'
import {createStore, Store} from 'redux'
import { Provider } from 'react-redux'
import counterReducer from './reducers/counterReducer'
import { CounterState } from './actions'

describe('App', () => {
  it('renders App component', () => {
    render(<App />)
    expect(screen.getByText(/Welcome to project/i)).toBeInTheDocument()
  })
})

interface Initializer {
  initialState?: CounterState
  store?: Store
}

const initialState: CounterState = {
  count: 0
}

const renderWithRedux = (
  component: React.ReactElement,
  initializer: Initializer = {}
): RenderResult & {store: Store} => {
  const store = initializer.store || createStore(counterReducer, initializer.initialState || initialState)
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

describe('Redux testing', () => {
  it('checks initial state is equal to 0', () => {
    const { getByRole } = renderWithRedux(<Counter />)
    expect(getByRole('heading')).toHaveTextContent('0')
  })
  it('increments the counter through redux', () => {
    const { getByRole, getByText } = renderWithRedux(<Counter />, {
      initialState: { count: 2 },
    })
    userEvent.click(getByText('+'))
    expect(getByRole('heading')).toHaveTextContent('3')
  })
  it('decrements the counter through redux', () => {
    const { getByRole, getByText } = renderWithRedux(<Counter />, {
      initialState: { count: 100 },
    })
    userEvent.click(getByText('-'))
    expect(getByRole('heading')).toHaveTextContent('99')
  })
})
