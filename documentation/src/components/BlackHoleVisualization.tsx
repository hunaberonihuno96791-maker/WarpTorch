import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BlackHoleVisualization: React.FC = () => {
  const [mass, setMass] = useState<number>(1.0);

  // Generate data for Schwarzschild radius visualization
  const generateData = () => {
    const data = [];
    for (let r = 0.1; r <= 10; r += 0.1) {
      const rs = 2 * mass; // Schwarzschild radius (simplified units)
      let metricComponent;

      if (r < rs) {
        // Inside event horizon
        metricComponent = -Math.abs(1 - rs / r);
      } else {
        // Outside event horizon
        metricComponent = 1 - rs / r;
      }

      data.push({
        r: r.toFixed(2),
        'g_tt': metricComponent,
        'Event Horizon': r === rs ? 1 : 0,
      });
    }
    return data;
  };

  const data = generateData();
  const schwarzschildRadius = (2 * mass).toFixed(2);

  return (
    <div className="black-hole-visualization">
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#1F2937', borderRadius: '8px' }}>
        <h4 style={{ color: '#F9FAFB', marginBottom: '10px' }}>Interactive Black Hole Parameters</h4>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <label style={{ color: '#9CA3AF' }}>
            Black Hole Mass (M): {mass.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.5"
            max="5.0"
            step="0.1"
            value={mass}
            onChange={(e) => setMass(parseFloat(e.target.value))}
            style={{ flex: 1, maxWidth: '300px' }}
          />
        </div>
        <p style={{ color: '#9CA3AF', marginTop: '10px', fontSize: '14px' }}>
          Schwarzschild Radius (r_s = 2GM/c²): {schwarzschildRadius} units
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="r"
            stroke="#9CA3AF"
            label={{ value: 'Radial Distance (r)', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
          />
          <YAxis
            stroke="#9CA3AF"
            label={{ value: 'g_tt Component', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
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
            dataKey="g_tt"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={false}
            name="Time Component (g_tt)"
          />
        </LineChart>
      </ResponsiveContainer>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#1F2937', borderRadius: '8px' }}>
        <h4 style={{ color: '#F9FAFB', marginBottom: '10px' }}>Key Features</h4>
        <ul style={{ color: '#9CA3AF', marginLeft: '20px', fontSize: '14px' }}>
          <li>
            <strong style={{ color: '#F9FAFB' }}>Event Horizon:</strong> At r = {schwarzschildRadius}, g_tt = 0
          </li>
          <li>
            <strong style={{ color: '#F9FAFB' }}>Inside Horizon:</strong> g_tt becomes positive - time and space swap roles
          </li>
          <li>
            <strong style={{ color: '#F9FAFB' }}>Far Field:</strong> As r → ∞, g_tt → 1 (flat spacetime)
          </li>
          <li>
            <strong style={{ color: '#F9FAFB' }}>Singularity:</strong> At r = 0, curvature becomes infinite
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlackHoleVisualization;