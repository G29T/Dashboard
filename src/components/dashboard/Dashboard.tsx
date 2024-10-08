import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Filters from '../filters/Filters';
import Chart from '../chart/Chart';
import './Dashboard.css';
import { logout } from '../../utils/auth';

const Dashboard = () => {
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        startDate: new Date(),
        endDate: new Date(), 
        location: 'All Locations',
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchMetrics();
    }, [filters]);

    const fetchMetrics = async () => {
        setLoading(true);
        try {
            // Constructing API endpoint URL with query parameters based on filters
            const response = await fetch(
                `http://localhost:5000/metrics?startDate=${filters.startDate.toISOString().split('T')[0]}&endDate=${filters.endDate.toISOString().split('T')[0]}&location=${filters.location}`
            );

            // Checking if the response is valid
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('API Response:', data);
            setMetrics(data); // Update state with the fetched metrics
        } catch (err) {
            setError('Failed to fetch metrics');
        } finally {
            setLoading(false);
        }
    };

    // Function to log the user out and navigate them back to the login screen
    const handleSignOut = async () => {
        await logout();
        navigate('/login'); 
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <h1 className="dashboard-title">Ad Metrics Dashboard</h1>
                <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
            </div>
            <Filters filters={filters} setFilters={setFilters} />
            {loading ? (
                <div className="loading-spinner">Loading...</div>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : metrics ? (
                <div className="metrics-container">
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <h2 className="metric-title">Daily Impressions</h2>
                            <p className="metric-value">{metrics.dailyImpressions}</p>
                        </div>
                        <div className="metric-card">
                            <h2 className="metric-title">Ad Requests</h2>
                            <p className="metric-value">{metrics.ad_requests}</p>
                        </div>
                        <div className="metric-card">
                            <h2 className="metric-title">Revenue</h2>
                            <p className="metric-value">${metrics.revenue}</p>
                        </div>
                    </div>
                    <Chart metrics={metrics} selectedLocation={filters.location} startDate={filters.startDate} endDate={filters.endDate} />
                </div>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default Dashboard;
