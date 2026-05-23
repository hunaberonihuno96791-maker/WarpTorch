import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ConvergenceData {
  gridSize: number;
  secondOrder: number;
  fourthOrder: number;
  eighthOrder: number;
}

const ConvergenceChart: React.FC = () => {
  // Convergence data for finite difference schemes
  const data: ConvergenceData[] = [
    { gridSize: 16, secondOrder: 0.1, fourthOrder: 0.01, eighthOrder: 0.0001 },
    { gridSize: 32, secondOrder: 0.05, fourthOrder: 0.001, eighthOrder: 0.000001 },
    { gridSize: 64, secondOrder: 0.025, fourthOrder: 0.0001, eighthOrder: 0.00000001 },
    { gridSize: 128, secondOrder: 0.0125, fourthOrder: 0.00001, eighthOrder: 0.0000000001 },
  ];

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Finite Difference Scheme Convergence</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="gridSize"
            label={{ value: 'Grid Size', position: 'insideBottom', offset: -5 }}
            scale="log"
          />
          <YAxis
            label={{ value: 'Error (log scale)', angle: -90, position: 'insideLeft' }}
            scale="log"
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="secondOrder"
            stroke="#8884d8"
            name="2nd Order"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="fourthOrder"
            stroke="#82ca9d"
            name="4th Order"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="eighthOrder"
            stroke="#ffc658"
            name="8th Order"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        The chart shows how numerical differentiation error decreases with increasing grid size
        for schemes of different accuracy orders. WarpTorch uses 4th order as an optimal balance between accuracy and performance.
      </p>
    </div>
  );
};

export default ConvergenceChart;