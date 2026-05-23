import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const MicroBubbleChart: React.FC = () => {
  const [compression, setCompression] = useState<number>(10);

  const data = [
    {
      metric: 'Alcubierre',
      'Exotic Matter': 100,
      'Bubble Volume': 100,
      'Energy Density': 100,
    },
    {
      metric: 'Van den Broeck',
      'Exotic Matter': 100 / Math.sqrt(compression),
      'Bubble Volume': 100 / compression,
      'Energy Density': 100 * Math.sqrt(compression),
    },
  ];

  return (
    <div className="micro-bubble-chart">
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#1F2937', borderRadius: '8px' }}>
        <h4 style={{ color: '#F9FAFB', marginBottom: '10px' }}>Micro-Bubble Compression Factor</h4>
        <label style={{ color: '#9CA3AF', display: 'block', marginBottom: '10px' }}>
          Space Compression: {compression}x
        </label>
        <input
          type="range"
          min="2"
          max="100"
          step="1"
          value={compression}
          onChange={(e) => setCompression(parseFloat(e.target.value))}
          style={{ width: '100%', maxWidth: '400px' }}
        />
        <p style={{ color: '#9CA3AF', marginTop: '10px', fontSize: '14px' }}>
          Higher compression reduces total exotic matter but increases energy density
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="metric" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" label={{ value: 'Relative Value (%)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
            }}
          />
          <Legend wrapperStyle={{ color: '#9CA3AF' }} />
          <Bar dataKey="Exotic Matter" fill="#EF4444" name="Total Exotic Matter" />
          <Bar dataKey="Bubble Volume" fill="#3B82F6" name="Effective Volume" />
          <Bar dataKey="Energy Density" fill="#F59E0B" name="Energy Density" />
        </BarChart>
      </ResponsiveContainer>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#1F2937', borderRadius: '8px' }}>
        <h4 style={{ color: '#F9FAFB', marginBottom: '10px' }}>How Micro-Bubble Works</h4>
        <ul style={{ color: '#9CA3AF', marginLeft: '20px', fontSize: '14px' }}>
          <li>
            <strong style={{ color: '#F9FAFB' }}>Conformal Factor:</strong> B²(r) compresses space inside the bubble
          </li>
          <li>
            <strong style={{ color: '#F9FAFB' }}>Volume Reduction:</strong> Effective volume decreases by compression factor
          </li>
          <li>
            <strong style={{ color: '#F9FAFB' }}>Energy Savings:</strong> Total exotic matter ∝ 1/√compression
          </li>
          <li>
            <strong style={{ color: '#F9FAFB' }}>Trade-off:</strong> Higher energy density in smaller region
          </li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#065F46', borderRadius: '8px', border: '1px solid #10B981' }}>
        <h4 style={{ color: '#F9FAFB', marginBottom: '10px' }}>Key Improvement</h4>
        <p style={{ color: '#D1FAE5', fontSize: '14px', lineHeight: '1.6' }}>
          With {compression}x compression, Van den Broeck requires{' '}
          <strong style={{ color: '#10B981' }}>
            {(100 / Math.sqrt(compression)).toFixed(1)}%
          </strong>{' '}
          of the exotic matter compared to Alcubierre, while energy density increases to{' '}
          <strong style={{ color: '#F59E0B' }}>
            {(100 * Math.sqrt(compression)).toFixed(0)}%
          </strong>
          .
        </p>
      </div>
    </div>
  );
};

export default MicroBubbleChart;