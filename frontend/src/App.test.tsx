import React from 'react';
// import { render } from '@testing-library/react';
import App from './App';
import { Button } from './components/button/Button';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (component: any) => shallow(component);

const findByTestAttr = (wrapper: any, val: string | number) =>
  wrapper.find(`[data-test='${val}']`);

test('renders without error', () => {
  const wrapper = setup(<App />);
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders button', () => {
  const wrapper = setup(<Button />);
  const button = findByTestAttr(wrapper, 'component-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup(<Button />);
  const display = findByTestAttr(wrapper, 'counter-display');
  expect(display.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup(<Button />);
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe('0');
});

test('clicking button increments display', () => {
  const wrapper = setup(<Button />);
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe('1');
});
