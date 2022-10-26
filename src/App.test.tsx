import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ButtonComponent from "./app/components/ButtonComponent";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test: Button Props', () => {
  render(<ButtonComponent caption={'Test'} onClick={() => {}}/>);
  const linkElement = screen.getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
