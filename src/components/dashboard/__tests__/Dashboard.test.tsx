import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../utils/auth';

jest.mock('../../../utils/auth', () => ({
    logout: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();

beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
});

describe('Dashboard Component', () => {
    it('renders dashboard title and loading state', () => {
        render(<Dashboard />);
        expect(screen.getByText(/Ad Metrics Dashboard/i)).toBeInTheDocument();
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('shows error message when fetching metrics fails', async () => {
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Network response was not ok'))
        );

        render(<Dashboard />);
        expect(await screen.findByText(/Failed to fetch metrics/i)).toBeInTheDocument();
    });

    it('logs out user when Sign Out button is clicked', async () => {
        (logout as jest.Mock).mockResolvedValueOnce(undefined); 

        render(<Dashboard />);

        fireEvent.click(screen.getByText(/Sign Out/i));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });

        expect(logout).toHaveBeenCalled();
    });
});
