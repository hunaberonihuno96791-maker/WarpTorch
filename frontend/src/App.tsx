import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import AlcubierreWarpBubble from './components/AlcubierreWarpBubble'
import AxesHelper from './components/AxesHelper'
import SimulationPanel from './components/SimulationPanel'
import './App.css'

function App() {
  const [simulationData, setSimulationData] = useState<any>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  
  // Изначально двигатель "ВЫКЛЮЧЕН". Пузыря нет.
  const [activeParams, setActiveParams] = useState({
    velocity: 0.0,
    radius: 0.0,  // Радиус 0 - пузырь невидим
    sigma: 1.0
  })

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
      
      // После ответа бэкенда передаем новые целевые параметры в 3D
      setActiveParams({
        velocity: params.velocity,
        radius: params.radius,
        sigma: params.sigma
      })
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
        results={simulationData}
      />

      <div className="canvas-container">
        <Canvas camera={{ position: [15, 15, 20], fov: 50 }}>
          <color attach="background" args={['#0a0a0f']} />
          <ambientLight intensity={0.5} />
          
          <Grid
            args={[40, 40]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#333"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#666"
            fadeDistance={50}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid
          />

          <AxesHelper size={5} />

          <AlcubierreWarpBubble
            data={simulationData}
            velocity={activeParams.velocity}
            radius={activeParams.radius}
            sigma={activeParams.sigma}
          />

          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.05}
            minDistance={5}
            maxDistance={80}
          />
        </Canvas>
      </div>
    </div>
  )
}

export default App