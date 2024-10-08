import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../Register';
import * as authUtils from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { UserCredential } from 'firebase/auth';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('Register Component', () => {
    const mockNavigate = jest.fn();

    // Mock UserCredential for successful registration
    const mockUserCredential: UserCredential = {
        user: {
            uid: '12345',
            email: 'test@example.com',
            providerId: 'firebase',  
        },
        additionalUserInfo: null,
        operationType: 'signIn',
        providerId: 'firebase',  
    } as unknown as UserCredential;

    beforeEach(() => {
        (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
        render(<Register />);
    });

    it('renders the register form', () => {
        expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });

    it('shows an error message for invalid password', async () => {
        // Enter an invalid password
        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'test@example.com' },
        });

        // Weak password that doesn't meet criteria
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'weak' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        // Check that the error message is displayed
        await waitFor(() => {
            expect(screen.getByText(/Password must be at least 6 characters long, contain at least one number, one uppercase letter, one lowercase letter, and one special character./i)).toBeInTheDocument();
        });
    });

    it('calls register and navigates on successful registration', async () => {
        // Mock the register function
        jest.spyOn(authUtils, 'register').mockResolvedValueOnce(mockUserCredential);

        // Enter valid credentials
        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'test@example.com' },
        });

        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'Valid1@Password' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('shows an error message on registration failure', async () => {
        // Mock the register function to throw an error
        jest.spyOn(authUtils, 'register').mockRejectedValueOnce(new Error('Firebase: User already exists.'));

        // Enter valid credentials
        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'test@example.com' },
        });

        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'Valid1@Password' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        // Check that the error message is displayed
        await waitFor(() => {
            expect(screen.getByText(/User already exists./i)).toBeInTheDocument();
        });
    });
});
