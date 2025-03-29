import { React, useContext } from 'react';
import {
    LineChart,BarChart,Line,Bar,XAxis,YAxis,
    CartesianGrid,Tooltip,Legend,
    PieChart,Pie,Cell,ResponsiveContainer,
} from 'recharts';
import { DataContext } from './QueryInput';

// const COLORS = ['#3ecf8e', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6'];


export const ResultChart = () => {
    const { data} = useContext(DataContext);
 
    if (!data || data.length === 0) { // return if there is no data
        return ;
    }

    // Determine the chart type
    const chartType = data[0]?.chartType;
    console.log('Chart Type:', chartType);

    switch (chartType) {

        // Additional chart is included in each case to act as a placeholder for responsive checks(future) / To display various types of charts in UI
        case 'line':
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            );
        case 'bar':
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            );
        case 'pie':
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            );
        default:
            return <div>Invalid chart type.</div>;
    }
};
