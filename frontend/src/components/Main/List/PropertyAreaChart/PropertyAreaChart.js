import React from 'react';
import { AreaChart,  Area, ResponsiveContainer } from 'recharts';
import './PropertyAreaChart.css';

const PropertyAreaChart = ({
                               chartData, xAxisKey
                           }) => {

    return (
        <ResponsiveContainer width='100%' height={200}>
            <AreaChart width={200} height={60} data={chartData}
                       margin={{top: 5, right: 0, left: 0, bottom: 5}}>
                <Area type='monotone' dataKey={xAxisKey} stroke='#00b5ad' fill='#00b5ad' />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default PropertyAreaChart;