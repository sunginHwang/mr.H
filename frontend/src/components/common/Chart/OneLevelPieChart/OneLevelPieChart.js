import React from 'react';
import { PieChart, Pie,  Cell, Legend, Label } from 'recharts';
import { pieChartColor } from 'lib/variables';

const OneLevelPieChart = ({
    width,
    height,
    data,
    cx,
    cy,
    centerLableValue,
    legentAlign
}) => {
  return (
      <PieChart width={width} height={height} >
          <Legend align={legentAlign}/>
          <Pie
              data={data}
              dataKey="value"
              cx={cx}
              cy={cy}
              startAngle={180}
              endAngle={-180}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              label
          >
              {
                  data.map((entry, index) => (
                      <Cell key={`slice-${index}`} fill={pieChartColor[index % 10]}/>
                  ))
              }
              <Label width={80} position="center">
                  {centerLableValue}
              </Label>
          </Pie>
      </PieChart>
  );
};
 
export default OneLevelPieChart;
