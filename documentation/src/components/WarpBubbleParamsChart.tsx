import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WarpBubbleParamsChart: React.FC = () => {
  const [velocity, setVelocity] = useState<number>(1.5);
  const [radius, setRadius] = useState<number>(6.0);

  // Generate data for energy requirements vs velocity
  const generateVelocityData = () => {
    const data = [];
    for (let v = 0.1; v <= 3.0; v += 0.1) {
      const energy = Math.pow(10, v * 2) * Math.exp(-radius / 5);
      data.push({
        velocity: v.toFixed(2),
        'Energy Required (log scale)': Math.log10(energy),
      });
    }
    return data;
  };

  // Generate data for energy vs bubble radius
  const generateRadiusData = () => {
    const data = [];
    for (let r = 1; r <= 15; r += 0.5) {
      const energy = Math.pow(10, velocity * 2) * Math.exp(-r / 5);
      data.push({
        radius: r.toFixed(1),
        'Energy Required (log scale)': Math.log10(energy),
      });
    }
    return data;
  };

  const velocityData = generateVelocityData();
  const radiusData = generateRadiusData();
  const currentEnergy = (Math.pow(10, velocity * 2) * Math.exp(-radius / 5)).toExponential(2);

  return (
    <div className="warp-bubble-params-chart">
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#1F2937', borderRadius: '8px' }}>
        <h4 style={{ color: '#F9FAFB', marginBottom: '10px' }}>Interactive Warp Bubble Parameters</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '5px' }}>
              Bubble Velocity (v): {velocity.toFixed(1)}c
            </label>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={velocity}
              onChange={(e) => setVelocity(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '5px' }}>
              Bubble Radius (R): {radius.toFixed(1)} units
            </label>
            <input
              type="range"
              min="1.0"
              max="15.0"
              step="0.5"
              value={radius}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <p style={{ color: '#9CA3AF', marginTop: '15px', fontSize: '14px' }}>
          Estimated Energy Required: {currentEnergy} (normalized units)
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h4 style={{ color: '#F9FAFB', marginBottom: '15px' }}>Energy vs Velocity</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={velocityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="velocity"
              stroke="#9CA3AF"
              label={{ value: 'Velocity (v/c)', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
            />
            <YAxis
              stroke="#9CA3AF"
              label={{ value: 'log₁₀(Energy)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="Energy Required (log scale)"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h4 style={{ color: '#F9FAFB', marginBottom: '15px' }}>Energy vs Bubble Radius</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={radiusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="radius"
              stroke="#9CA3AF"
              label={{ value: 'Bubble Radius (R)', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
            />
            <YAxis
              stroke="#9CA3AF"
              label={{ value: 'log₁₀(Energy)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="Energy Required (log scale)"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#1F2937', borderRadius: '8px' }}>
        <h4 style={{ color: '#F9FAFB', marginBottom: '10px' }}>Physical Insights</h4>
        <ul style={{ color: '#9CA3AF', marginLeft: '20px', fontSize: '14px' }}>
          <li>
            <strong style={{ color: '#F9FAFB' }}>Velocity Scaling:</strong> Energy increases exponentially with velocity (E ∝ e^(αv))
          </li>
          <li>
            <strong style={{ color: '#F9FAFB' }}>Radius Effect:</strong> Larger bubbles reduce energy density but increase total energy
          </li>
          <li>
            <strong style={{ color: '#F9FAFB' }}>Trade-offs:</strong> Optimal parameters depend on mission requirements
          </li>
          <li>
            <strong style={{ color: '#F9FAFB' }}>Practical Limits:</strong> Energy requirements become astronomical for v > 2c
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WarpBubbleParamsChart;