
import React from 'react';
import { ResponsiveContainer, LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar } from 'recharts';
import { mockPerformanceData } from '../../services/mockData';

interface ChartComponentProps {
    type: 'line' | 'bar';
    dataKey: string;
    title: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ type, dataKey, title }) => {
    const Chart = type === 'line' ? LineChart : BarChart;
    const ChartElement = type === 'line' ? Line : Bar;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-96">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height="90%">
                <Chart data={mockPerformanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}/>
                    <Legend />
                    <ChartElement type="monotone" dataKey={dataKey} fill="#4f46e5" stroke="#4f46e5" />
                </Chart>
            </ResponsiveContainer>
        </div>
    );
};


export default ChartComponent;
