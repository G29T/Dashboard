import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../Filters'; 

// Mock data for the filters prop
const mockFilters = {
    startDate: new Date(2023, 0, 1), // January 1, 2023
    endDate: new Date(2023, 0, 31),
    location: 'All Locations',
};

const mockSetFilters = jest.fn();

describe('Filters Component', () => {
    beforeEach(() => {
        render(<Filters filters={mockFilters} setFilters={mockSetFilters} />);
    });

    it('renders correctly with initial filters', () => {
        expect(screen.getByLabelText(/Start Date:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/End Date:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Geographic Location:/i)).toBeInTheDocument();
        
        expect(screen.getByDisplayValue('2023/01/01')).toBeInTheDocument();
        expect(screen.getByDisplayValue('2023/01/31')).toBeInTheDocument();
        expect(screen.getByDisplayValue('All Locations')).toBeInTheDocument();
    });

    it('updates start date when a new date is selected', () => {
        const newDate = new Date(2023, 1, 1); // February 1, 2023

        // Simulate changing the start date
        fireEvent.change(screen.getByLabelText(/Start Date:/i), {
            target: { value: newDate.toISOString().substring(0, 10) },
        });

        expect(mockSetFilters).toHaveBeenCalledWith({
            ...mockFilters,
            startDate: newDate,
        });
    });

    it('updates end date when a new date is selected', () => {
        const newDate = new Date(2023, 2, 1); // March 1, 2023

        // Simulate changing the end date
        fireEvent.change(screen.getByLabelText(/End Date:/i), {
            target: { value: newDate.toISOString().substring(0, 10) },
        });

        expect(mockSetFilters).toHaveBeenCalledWith({
            ...mockFilters,
            endDate: newDate,
        });
    });

    it('updates location when a new location is selected', () => {
        const newLocation = 'North America';

        // Simulate changing the location
        fireEvent.change(screen.getByLabelText(/Geographic Location:/i), {
            target: { value: newLocation },
        });

        expect(mockSetFilters).toHaveBeenCalledWith({
            ...mockFilters,
            location: newLocation,
        });
    });
});
