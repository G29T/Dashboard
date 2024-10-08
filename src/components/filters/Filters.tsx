import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Filters.css';

interface FiltersProps {
    filters: { startDate: Date; endDate: Date; location: string };
    setFilters: (filters: { startDate: Date; endDate: Date; location: string }) => void;
}

const Filters = ({ filters, setFilters }: FiltersProps) => {
    return (
        <div className="filters-container">
            <div className="date-filter-container">
                <div className="start-date-filter-container">
                    <label htmlFor="start-date" className="filter-label">
                        Start Date:
                    </label>
                    <div className="react-datepicker-wrapper">
                        <DatePicker
                            id="start-date"
                            selected={filters.startDate}
                            onChange={(date: Date | null) => {
                                if (date) {
                                    setFilters({ ...filters, startDate: date });
                                }
                            }} 
                            className="datepicker"
                            dateFormat="yyyy/MM/dd" 
                        />
                    </div>
                </div>
                <div className="end-date-filter-container">
                    <label htmlFor="end-date" className="filter-label">
                        End Date:
                    </label>
                    <div className="react-datepicker-wrapper">
                        <DatePicker
                            id="end-date"
                            selected={filters.endDate}
                            onChange={(date: Date | null) => {
                                if (date) {
                                    setFilters({ ...filters, endDate: date });
                                }
                            }} 
                            className="datepicker"
                            dateFormat="yyyy/MM/dd"
                        />
                    </div>
                </div>
            </div>
            <div className="location-filter-container">
                <label htmlFor="location" className="filter-label">
                    Geographic Location:
                </label>
                <select
                    id="location"
                    aria-label="Geographic Location"
                    className="location-select"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                >
                    <option value="All">All Locations</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
