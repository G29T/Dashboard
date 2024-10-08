import React from 'react';
import { render } from '@testing-library/react';
import Chart from '../Chart';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
        currentUser: null,
    })),
}));

describe('Chart Component', () => {
    it('shows no data message when there are no metrics', () => {
        const emptyMetrics = {
            dailyImpressions: 0,
            ad_requests: 0,
            revenue: 0,
            data: [],
        };

        const { getByText } = render(
            <Chart metrics={emptyMetrics} selectedLocation="All Locations" startDate={new Date()} endDate={new Date()} />
        );

        expect(getByText(/No data available/i)).toBeInTheDocument();
    });
}); 