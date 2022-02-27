import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('it should render the title', () => {
  render(<App />);
  // const linkElement = screen.getByText(/bug tracker/i);
  const linkElement = screen.getByText(/bug tracker/i);
  expect(linkElement).toBeInTheDocument();
});

test('it creates a new bug', () => {
  render(<App />);
  const inputEl = screen.getByTestId('bugDesc');
  userEvent.type(inputEl, 'test bug');
  fireEvent.click(screen.getByTestId('addBtn'));
  expect(screen.getByText(/test bug/i)).toBeInTheDocument();
});
