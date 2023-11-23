/**
 * @jest-environment jsdom
 */

import Login from '../src/Components/Login/Login';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockLogin = jest.fn();
const mockSetToken = jest.fn();
jest.mock('../src/Utils/auth', () => {
  return { useAuth: () => ({ login: mockLogin, mockLotToken: mockSetToken })};
});

describe('Login component', () => {

  it('should redirect the user if they wish to register', () => {
    render(<Login />);

    const registerButton = screen.getByText(/or register/);

    fireEvent.click(registerButton);
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});
