import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Button } from './components/button/Button';
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
    render(<Button />);
    screen.debug();
    expect(screen.getByText(/Большая зеленая кнопка/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('Counter', () => {
  it('renders counter and it starts from 0', () => {
    render(<Button />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
  it('clicks counter', () => {
    render(<Button />);
    userEvent.click(screen.getByText(/Большая зеленая кнопка/i));
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
