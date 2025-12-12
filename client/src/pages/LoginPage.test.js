import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Required because LoginPage uses useNavigate
import LoginPage from './LoginPage';

test('renders login form with email, password, and submit button', () => {
  // 1. Render the component wrapped in Router (to handle navigation hooks)
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  // 2. Check if the specific elements exist on the screen
  const emailInput = screen.getByPlaceholderText(/Enter email/i);
  const passwordInput = screen.getByPlaceholderText(/Enter password/i);
  // Note: We use the exact text that is inside <button> tag
  const submitButton = screen.getByRole('button', { name: /Sign In/i });

  // 3. Assert that they are present in the document
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});