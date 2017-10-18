import React from 'react';
import {LineChart, Line , XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PropertyLineChart.css';

const RotateAxisTick = ({x, y, stroke, payload}) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={3} y={0} dy={16} textAnchor="end" fill="#666" >{payload.value}</text>
        </g>
    )
};
const PropertyLineChart = ({
    chartData,
    yAxisKey,
    xAxisKey,
    chartLineColor
}) => {
  return (
      <ResponsiveContainer width='100%' height={200}>
          <LineChart  data={chartData}
                      margin={{top: 20, right: 30, left: 15, bottom: 0}}>
              <XAxis dataKey={yAxisKey} tick={<RotateAxisTick/>} />
              <YAxis hide={true} />
              <Tooltip/>
              <Line type='monotone' 
                    dataKey={xAxisKey}
                    stroke={chartLineColor} 
                    label={{ fontSize: 10, position: 'insideBottom' }} />
          </LineChart>
      </ResponsiveContainer>
  );
};
 
export default PropertyLineChart;