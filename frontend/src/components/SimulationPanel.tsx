import { useState } from 'react'
import './SimulationPanel.css'

interface SimulationPanelProps {
  onStart: (params: any) => void
  isSimulating: boolean
  results?: any
}

function SimulationPanel({ onStart, isSimulating, results }: SimulationPanelProps) {
  const [params, setParams] = useState({
    metric: 'alcubierre', // Новое поле
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
        <p className="subtitle">Spacetime Metric Visualization</p>

        <div className="controls">
          <div className="control-group">
            <label>Spacetime Metric:</label>
            <select
              value={params.metric}
              onChange={(e) => setParams({ ...params, metric: e.target.value })}
              disabled={isSimulating}
              className="metric-select"
              style={{ padding: '8px', background: '#1a1a2e', color: '#fff', border: '1px solid #0055aa', borderRadius: '4px', width: '100%' }}
            >
              <option value="alcubierre">Alcubierre (1994) - Classic</option>
              <option value="lentz">Lentz (2021) - Positive Energy</option>
              <option value="vandenbroeck">Van Den Broeck (1999) - Micro</option>
            </select>
          </div>

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
                  <span className={`value ${results.statistics.min < 0 ? 'negative' : 'positive'}`}>
                    {results.statistics.min.toExponential(2)}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Max Energy Density:</span>
                  <span className="value positive">
                    {results.statistics.max.toExponential(2)}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Condition:</span>
                  <span className={`value ${results.metadata?.energy_condition === 'Satisfied' ? 'positive' : 'negative'}`}>
                    {results.metadata?.energy_condition || (params.metric === 'lentz' ? 'Satisfied' : 'Violated')}
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
          style={{ marginTop: '15px' }}
        >
          {isSimulating ? 'Simulating...' : 'Start Simulation'}
        </button>
      </div>
    </div>
  )
}

export default SimulationPanel