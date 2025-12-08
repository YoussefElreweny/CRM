
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartComponentProps {
    type: 'line' | 'bar';
    dataKey: string;
    title: string;
    data?: any[]; // Accept data via props
}

const ChartComponent: React.FC<ChartComponentProps> = ({ type, dataKey, title, data = [] }) => {
    const Chart = type === 'line' ? LineChart : BarChart;
    const DataComponent = type === 'line' ? Line : Bar;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
            {data.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-gray-500">
                    No data available
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <Chart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <DataComponent type="monotone" dataKey={dataKey} stroke="#4F46E5" fill="#4F46E5" />
                    </Chart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default ChartComponent;
