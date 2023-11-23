/**
 * @jest-environment jsdom
 */

import Login from '../src/Components/Login/Login';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { validatePassword } from '../src/apiService';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockLogin = jest.fn();
const mockSetToken = jest.fn();
jest.mock('../src/Utils/auth', () => {
  return { useAuth: () => ({ login: mockLogin, setToken: mockSetToken }) };
});

jest.mock('../src/apiService', () => {
  return { validatePassword: jest.fn() };
});

describe('Login component', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect the user to /register if they wish to register', () => {
    render(<Login />);

    const registerButton = screen.getByText(/or register/);

    fireEvent.click(registerButton);
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  it('should redirect the user to /dashboard if they provide valid credentials', async () => {
    (validatePassword as jest.Mock).mockResolvedValue({status: 200});

    render(<Login />);

    const loginButton = screen.getByRole('button');
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.type(usernameInput, 'username');
    userEvent.type(passwordInput, 'password');

    fireEvent.click(loginButton);
    await waitFor( () => expect(mockNavigate).toHaveBeenCalledWith('/dashboard'));
  });
});
