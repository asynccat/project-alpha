import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BlueButton } from './components/button/Button';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  it('renders App component', () => {
    render(<App />);
    screen.debug();
    expect(screen.getByText(/Welcome to project/i)).toBeInTheDocument();
  });
});

describe('Button', () => {
  it('renders Button', () => {
    render(<BlueButton />);
    screen.debug();
    expect(screen.getByText(/Большая синяя кнопка/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('Counter', () => {
  it('renders counter and it starts from 0', () => {
    render(<BlueButton />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
  it('clicks counter', () => {
    render(<BlueButton />);
    userEvent.click(screen.getByText(/Большая синяя кнопка/i));
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
