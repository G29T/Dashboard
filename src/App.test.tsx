import React from 'react';
import { render } from '@testing-library/react';
import Chart from './components/chart/Chart';

// Mock metrics data for testing
const mockMetrics = {
  dailyImpressions: 100,
  ad_requests: 50,
  revenue: 200,
  data: [
      { date: '2023-01-01', impressions: 10, ad_requests: 5, revenue: 20, location: 'All' },
      { date: '2023-01-02', impressions: 20, ad_requests: 10, revenue: 40, location: 'North America' },
  ],
};

describe('Chart Component', () => {
  it('shows no data message when there are no metrics', () => {
    const emptyMetrics = {
        dailyImpressions: 0,
        ad_requests: 0,
        revenue: 0,
        data: [],
    };

    const { getByText } = render(
        <Chart
            metrics={emptyMetrics}
            selectedLocation="All Locations"
            startDate={new Date()}
            endDate={new Date()}
        />
    );

    expect(getByText(/No data available/i)).toBeInTheDocument();
  });
});
