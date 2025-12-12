import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Library App title', () => {
  render(<App />);
  // Check for the "Library App" text which is in your Navbar
  const titleElement = screen.getByText(/Library App/i);
  expect(titleElement).toBeInTheDocument();
});