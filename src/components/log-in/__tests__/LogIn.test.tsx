import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../LogIn';
import * as authUtils from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('Login Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
        render(<Login />);
    });

    it('renders the login form', () => {
        expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
    });

    it('shows an error message for invalid login', async () => {
        // Mock the login function to throw an error
        jest.spyOn(authUtils, 'login').mockRejectedValueOnce(new Error('Firebase: Invalid email or password.'));

        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'InvalidPassword' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

        // Check that the error message is displayed
        await waitFor(() => {
            expect(screen.getByText(/Invalid email or password./i)).toBeInTheDocument();
        });
    });

    it('calls login and navigates on successful login', async () => {
        const mockUserCredential = {
            user: {
                uid: '123456',
                email: 'test@example.com',
            },
            additionalUserInfo: null,
            operationType: 'signIn',
            providerId: 'password', 
        };

        // Mock the login function
        jest.spyOn(authUtils, 'login').mockResolvedValueOnce(mockUserCredential);

        // Enter valid credentials
        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'ValidPassword1!' },
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

        // Wait for the navigate function to be called
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('shows an error message on login failure', async () => {
        // Mock the login function to throw an error
        jest.spyOn(authUtils, 'login').mockRejectedValueOnce(new Error('Firebase: User not found.'));

        // Enter valid credentials
        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'ValidPassword1!' },
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

        // Check that the error message is displayed
        await waitFor(() => {
            expect(screen.getByText(/User not found./i)).toBeInTheDocument();
        });
    });
});
