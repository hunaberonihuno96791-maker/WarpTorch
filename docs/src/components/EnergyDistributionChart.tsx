import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EnergyData {
  metric: string;
  positiveEnergy: number;
  negativeEnergy: number;
  exoticMatter: number;
}

const EnergyDistributionChart: React.FC = () => {
  // Energy distribution data for different metrics
  const data: EnergyData[] = [
    {
      metric: 'Alcubierre',
      positiveEnergy: 0.1,
      negativeEnergy: -10.5,
      exoticMatter: 10.4,
    },
    {
      metric: 'Lentz',
      positiveEnergy: 5.2,
      negativeEnergy: -1.5,
      exoticMatter: 1.5,
    },
    {
      metric: 'Van den Broeck',
      positiveEnergy: 0.2,
      negativeEnergy: -3.8,
      exoticMatter: 3.6,
    },
    {
      metric: 'Schwarzschild',
      positiveEnergy: 0,
      negativeEnergy: 0,
      exoticMatter: 0,
    },
  ];

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Comparison of Energy Requirements for Warp Metrics</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" label={{ value: 'Metric', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Energy (arbitrary units)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="positiveEnergy" fill="#10b981" name="Positive Energy" />
          <Bar dataKey="negativeEnergy" fill="#ef4444" name="Negative Energy" />
          <Bar dataKey="exoticMatter" fill="#8b5cf6" name="Exotic Matter" />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
        <h4>Analysis of Energy Conditions:</h4>
        <ul>
          <li><strong>Alcubierre:</strong> Requires enormous amounts of exotic matter (negative energy)</li>
          <li><strong>Lentz:</strong> Minimal exotic matter requirements, positive energy</li>
          <li><strong>Van den Broeck:</strong> Reduced requirements through micro-bubble</li>
          <li><strong>Schwarzschild:</strong> Vacuum solution, does not require exotic matter</li>
        </ul>
      </div>
    </div>
  );
};

export default EnergyDistributionChart;