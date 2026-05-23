import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MetricComparisonChart: React.FC = () => {
  const data = [
    {
      metric: 'Alcubierre',
      'Energy Required': 100,
      'Energy Condition Violations': 100,
      'Stability': 20,
      'Feasibility': 5,
    },
    {
      metric: 'Lentz',
      'Energy Required': 35,
      'Energy Condition Violations': 15,
      'Stability': 70,
      'Feasibility': 40,
    },
    {
      metric: 'Van den Broeck',
      'Energy Required': 50,
      'Energy Condition Violations': 80,
      'Stability': 40,
      'Feasibility': 25,
    },
    {
      metric: 'Schwarzschild',
      'Energy Required': 0,
      'Energy Condition Violations': 0,
      'Stability': 95,
      'Feasibility': 100,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="metric" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px',
          }}
        />
        <Legend wrapperStyle={{ color: '#9CA3AF' }} />
        <Bar dataKey="Energy Required" fill="#EF4444" name="Energy Required (log scale)" />
        <Bar dataKey="Energy Condition Violations" fill="#F59E0B" name="EC Violations" />
        <Bar dataKey="Stability" fill="#10B981" name="Stability Score" />
        <Bar dataKey="Feasibility" fill="#3B82F6" name="Feasibility Score" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MetricComparisonChart;