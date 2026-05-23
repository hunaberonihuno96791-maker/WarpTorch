import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const SimulationStepsChart: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Energy distribution data
  const energyData = [
    { position: -10, density: 0.001 },
    { position: -8, density: 0.002 },
    { position: -6, density: -0.5 },
    { position: -4, density: -2.0 },
    { position: -2, density: -5.0 },
    { position: 0, density: 0.001 },
    { position: 2, density: -5.0 },
    { position: 4, density: -2.0 },
    { position: 6, density: -0.5 },
    { position: 8, density: 0.002 },
    { position: 10, density: 0.001 },
  ];

  // Expansion scalar data
  const expansionData = [
    { position: -10, scalar: 0.0 },
    { position: -8, scalar: 0.01 },
    { position: -6, scalar: 0.2 },
    { position: -4, scalar: 0.8 },
    { position: -2, scalar: 1.5 },
    { position: 0, scalar: 0.0 },
    { position: 2, scalar: -1.5 },
    { position: 4, scalar: -0.8 },
    { position: 6, scalar: -0.2 },
    { position: 8, scalar: -0.01 },
    { position: 10, scalar: 0.0 },
  ];

  // Convergence data
  const convergenceData = [
    { gridSize: '16³', error2nd: 0.25, error4th: 0.06, error8th: 0.01 },
    { gridSize: '32³', error2nd: 0.12, error4th: 0.015, error8th: 0.001 },
    { gridSize: '64³', error2nd: 0.06, error4th: 0.004, error8th: 0.0001 },
    { gridSize: '128³', error2nd: 0.03, error4th: 0.001, error8th: 0.00001 },
  ];

  const steps = [
    {
      step: 1,
      title: 'Setup Environment',
      description: 'Initialize PyTorch with GPU support',
      component: null,
    },
    {
      step: 2,
      title: 'Create Alcubierre Metric',
      description: 'Define warp bubble parameters',
      component: null,
    },
    {
      step: 3,
      title: 'Compute Energy Requirements',
      description: 'Analyze negative energy distribution',
      component: (
        <div>
          <h4 style={{ color: '#F9FAFB', marginBottom: '15px' }}>Energy Density Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={energyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="position"
                stroke="#9CA3AF"
                label={{ value: 'Position from Bubble Center', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
              />
              <YAxis
                stroke="#9CA3AF"
                label={{ value: 'Energy Density', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="density"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#1F2937', borderRadius: '8px' }}>
            <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
              <strong style={{ color: '#EF4444' }}>Negative Energy</strong> required in bubble walls (red regions)
            </p>
          </div>
        </div>
      ),
    },
    {
      step: 4,
      title: 'Analyze Spacetime Geometry',
      description: 'Examine expansion and curvature',
      component: (
        <div>
          <h4 style={{ color: '#F9FAFB', marginBottom: '15px' }}>Expansion Scalar</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={expansionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="position"
                stroke="#9CA3AF"
                label={{ value: 'Position from Bubble Center', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
              />
              <YAxis
                stroke="#9CA3AF"
                label={{ value: 'Expansion θ', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="scalar" stroke="#10B981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#1F2937', borderRadius: '8px' }}>
            <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
              <strong style={{ color: '#10B981' }}>Space expands</strong> behind bubble (green, positive) and{' '}
              <strong style={{ color: '#3B82F6' }}>contracts</strong> ahead (negative)
            </p>
          </div>
        </div>
      ),
    },
    {
      step: 5,
      title: 'Convergence Analysis',
      description: 'Verify numerical accuracy',
      component: (
        <div>
          <h4 style={{ color: '#F9FAFB', marginBottom: '15px' }}>Scheme Convergence</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={convergenceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="gridSize"
                stroke="#9CA3AF"
                label={{ value: 'Grid Size', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
              />
              <YAxis
                stroke="#9CA3AF"
                label={{ value: 'Numerical Error', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="error2nd" stroke="#EF4444" strokeWidth={2} name="2nd Order" />
              <Line type="monotone" dataKey="error4th" stroke="#3B82F6" strokeWidth={2} name="4th Order" />
              <Line type="monotone" dataKey="error8th" stroke="#10B981" strokeWidth={2} name="8th Order" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#1F2937', borderRadius: '8px' }}>
            <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
              WarpTorch uses <strong style={{ color: '#3B82F6' }}>4th order schemes</strong> for optimal accuracy/performance
            </p>
          </div>
        </div>
      ),
    },
    {
      step: 6,
      title: 'Export Results',
      description: 'Save data for visualization',
      component: null,
    },
  ];

  const currentStepData = steps.find((s) => s.step === currentStep);

  return (
    <div className="simulation-steps-chart">
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#1F2937', borderRadius: '8px' }}>
        <h4 style={{ color: '#F9FAFB', marginBottom: '10px' }}>Simulation Progress</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {steps.map((s) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              style={{
                padding: '8px 16px',
                backgroundColor: currentStep === s.step ? '#3B82F6' : '#374151',
                color: currentStep === s.step ? '#FFFFFF' : '#9CA3AF',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (currentStep !== s.step) {
                  e.currentTarget.style.backgroundColor = '#4B5563';
                }
              }}
              onMouseLeave={(e) => {
                if (currentStep !== s.step) {
                  e.currentTarget.style.backgroundColor = '#374151';
                }
              }}
            >
              Step {s.step}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#1F2937', borderRadius: '8px' }}>
        <h3 style={{ color: '#F9FAFB', marginBottom: '10px' }}>
          Step {currentStep}: {currentStepData?.title}
        </h3>
        <p style={{ color: '#9CA3AF', marginBottom: '15px' }}>{currentStepData?.description}</p>
        {currentStepData?.component}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          style={{
            padding: '10px 20px',
            backgroundColor: currentStep === 1 ? '#374151' : '#3B82F6',
            color: currentStep === 1 ? '#6B7280' : '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
            fontSize: '14px',
          }}
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
          disabled={currentStep === 6}
          style={{
            padding: '10px 20px',
            backgroundColor: currentStep === 6 ? '#374151' : '#10B981',
            color: currentStep === 6 ? '#6B7280' : '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            cursor: currentStep === 6 ? 'not-allowed' : 'pointer',
            fontSize: '14px',
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default SimulationStepsChart;