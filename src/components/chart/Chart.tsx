import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './Chart.css'; 

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

// Define the structure of each data entry
interface DataEntry {
  date: string;
  impressions: number;
  ad_requests: number;
  revenue: number;
  location: string; 
}

// Props for the Chart component
interface ChartProps {
  metrics: {
    dailyImpressions: number;
    ad_requests: number;
    revenue: number;
    data: DataEntry[]; // Use the data array from the API
  };
  selectedLocation: string; 
  startDate: Date; 
  endDate: Date; 
}

type DataKey = 'impressions' | 'ad_requests' | 'revenue';

const Chart = ({ metrics, selectedLocation, startDate, endDate }: ChartProps) => {
    // Check if metrics data is available; if not, display a message
    if (!metrics || !metrics.data || metrics.data.length === 0) {
        return <p className="no-data">No data available</p>; // Render a message when there's no data
    }

    // Filter entries based on the selected location and date range
    const entries = metrics.data.filter(entry => {
        const entryDate = new Date(entry.date);
        return (
            (selectedLocation === 'All' || entry.location === selectedLocation) &&
            entryDate >= startDate &&
            entryDate <= endDate
        );
    });

    // Function to generate data for the chart based on the selected metric
    const generateChartData = (label: string, dataKey: DataKey) => {
        return {
            labels: entries.map((entry) => `${entry.date} (${entry.location})`),
            datasets: [
                {
                label,
                data: entries.map((entry) => entry[dataKey]),
                fill: false,
                // Set colors based on the metric being displayed
                backgroundColor: dataKey === 'impressions' ? 'blue' : dataKey === 'ad_requests' ? 'green' : 'red',
                borderColor: dataKey === 'impressions' ? 'blue' : dataKey === 'ad_requests' ? 'green' : 'red',
                },
            ],
        };
    };

    return (
        <div className="charts-container">
            <div className="chart-item">
                <h3>Impressions</h3>
                <Line data={generateChartData('Impressions', 'impressions')} />
            </div>
            <div className="chart-item">
                <h3>Ad Requests</h3>
                <Line data={generateChartData('Ad Requests', 'ad_requests')} />
            </div>
            <div className="chart-item">
                <h3>Revenue</h3>
                <Line data={generateChartData('Revenue', 'revenue')} />
            </div>
        </div>
    );
};

export default Chart;
