import { useState } from 'react'
import './SimulationPanel.css'

interface SimulationPanelProps {
  onStart: (params: any) => void
  isSimulating: boolean
  results?: any
}

function SimulationPanel({ onStart, isSimulating, results }: SimulationPanelProps) {
  const [params, setParams] = useState({
    velocity: 1.5,
    radius: 6.0,
    sigma: 4.0,
    gridSize: 64
  })

  const handleStart = () => {
    onStart(params)
  }

  return (
    <div className="simulation-panel">
      <div className="panel-content">
        <h2>WarpTorch Simulator</h2>
        <p className="subtitle">Alcubierre Warp Drive Visualization</p>

        <div className="controls">
          <div className="control-group">
            <label>
              Velocity (v):
              <span className="value">{params.velocity.toFixed(1)}c</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={params.velocity}
              onChange={(e) => setParams({ ...params, velocity: parseFloat(e.target.value) })}
              disabled={isSimulating}
            />
          </div>

          <div className="control-group">
            <label>
              Bubble Radius (R):
              <span className="value">{params.radius.toFixed(1)} units</span>
            </label>
            <input
              type="range"
              min="2.0"
              max="15.0"
              step="0.5"
              value={params.radius}
              onChange={(e) => setParams({ ...params, radius: parseFloat(e.target.value) })}
              disabled={isSimulating}
            />
          </div>

          <div className="control-group">
            <label>
              Boundary Thickness (σ):
               <span className="value">{params.sigma.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="1.0"
              max="8.0"
              step="0.5"
              value={params.sigma}
              onChange={(e) => setParams({ ...params, sigma: parseFloat(e.target.value) })}
              disabled={isSimulating}
            />
          </div>

          <div className="control-group">
            <label>
              Grid Resolution:
              <span className="value">{params.gridSize}³</span>
            </label>
            <select
              value={params.gridSize}
              onChange={(e) => setParams({ ...params, gridSize: parseInt(e.target.value) })}
              disabled={isSimulating}
            >
              <option value="32">32³ (Very Fast)</option>
              <option value="64">64³ (Medium)</option>
              <option value="96">96³ (High)</option>
            </select>
          </div>
        </div>

        <div className="info-panel">
          <h3>Simulation Info</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Status:</span>
              <span className={`value ${isSimulating ? 'running' : 'ready'}`}>
                {isSimulating ? 'Running...' : 'Ready'}
              </span>
            </div>
            
            {results && results.statistics && (
              <>
                <div className="info-item">
                  <span className="label">Min Energy Density:</span>
                  <span className="value negative">
                    {results.statistics.min.toExponential(2)}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Max Energy Density:</span>
                  <span className="value">
                    {results.statistics.max.toExponential(2)}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Condition:</span>
                  <span className="value negative">
                    {results.metadata?.energy_condition || 'Violated'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <button
          className="start-button"
          onClick={handleStart}
          disabled={isSimulating}
        >
          {isSimulating ? 'Simulating...' : 'Start Simulation'}
        </button>
      </div>
    </div>
  )
}

export default SimulationPanel