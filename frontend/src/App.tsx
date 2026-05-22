import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import AlcubierreWarpBubble from './components/AlcubierreWarpBubble'
import AxesHelper from './components/AxesHelper'
import SimulationPanel from './components/SimulationPanel'
import './App.css'

function App() {
  const [simulationData, setSimulationData] = useState(null)
  const [isSimulating, setIsSimulating] = useState(false)

  const handleSimulationStart = async (params: any) => {
    setIsSimulating(true)
    try {
      const response = await fetch('/api/simulate/alcubierre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      })
      const data = await response.json()
      setSimulationData(data)
    } catch (error) {
      console.error('Simulation error:', error)
    } finally {
      setIsSimulating(false)
    }
  }

  return (
    <div className="app">
      <SimulationPanel
        onStart={handleSimulationStart}
        isSimulating={isSimulating}
      />

      <div className="canvas-container">
        <Canvas camera={{ position: [15, 10, 15], fov: 50 }}>
          <color attach="background" args={['#0a0a0f']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4488ff" />

          <Grid
            args={[30, 30]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6cf"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#f6f"
            fadeDistance={40}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid
          />

          <AxesHelper size={5} />

          <AlcubierreWarpBubble
            data={simulationData}
            velocity={1.5}
            radius={6}
            sigma={4}
          />

          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.05}
            minDistance={5}
            maxDistance={50}
          />
        </Canvas>
      </div>
    </div>
  )
}

export default App
