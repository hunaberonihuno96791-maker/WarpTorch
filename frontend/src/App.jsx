import { useState, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Center } from '@react-three/drei'
import * as THREE from 'three'
import './App.css'

function WarpBubbleSimulation({ data }) {
  // data is the JSON payload containing metadata and flattened values array
  const { metadata, values } = data
  const { shape, dx, dy } = metadata
  const [nx, ny] = shape

  // Create geometry and colors based on data
  const { positions, colors, indices } = useMemo(() => {
    const positions = []
    const colors = []
    const indices = []

    // Find min and max for color normalization
    let minVal = Infinity
    let maxVal = -Infinity
    for (let i = 0; i < values.length; i++) {
      if (values[i] < minVal) minVal = values[i]
      if (values[i] > maxVal) maxVal = values[i]
    }

    // A small helper to map value to color (Red for negative/compression, Blue for positive/expansion)
    const getColor = (val) => {
      const color = new THREE.Color()
      if (val < 0) {
        // Red intensity for compression
        const intensity = val / minVal
        color.setRGB(1, 1 - intensity, 1 - intensity)
      } else if (val > 0) {
        // Blue intensity for expansion
        const intensity = val / maxVal
        color.setRGB(1 - intensity, 1 - intensity, 1)
      } else {
        color.setRGB(1, 1, 1) // white for zero
      }
      return color
    }

    const width = nx * dx
    const height = ny * dy
    const offsetX = -width / 2
    const offsetY = -height / 2

    // Build vertices
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        const idx = i * ny + j
        const val = values[idx]

        const x = offsetX + i * dx
        const y = offsetY + j * dy
        // Since expansion scalar can have large absolute values, let's normalize or scale it better
        // For alcubierre, the scalar is quite large, so 0.1 might still be too huge or too small.
        // Let's use a scale factor relative to the max absolute value.
        const maxAbs = Math.max(Math.abs(minVal), Math.abs(maxVal)) || 1
        const z = (val / maxAbs) * 5.0 // Max height displacement is 5 units

        positions.push(x, y, z)

        const c = getColor(val)
        colors.push(c.r, c.g, c.b)
      }
    }

    // Build faces (indices)
    for (let i = 0; i < nx - 1; i++) {
      for (let j = 0; j < ny - 1; j++) {
        const a = i * ny + j
        const b = (i + 1) * ny + j
        const c = i * ny + (j + 1)
        const d = (i + 1) * ny + (j + 1)

        // Triangle 1
        indices.push(a, b, d)
        // Triangle 2
        indices.push(a, d, c)
      }
    }

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      indices: new Uint32Array(indices)
    }
  }, [data, nx, ny, dx, dy, values])

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}> {/* Rotate to lie flat */}
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            count={indices.length}
            array={indices}
            itemSize={1}
          />
        </bufferGeometry>
        <meshStandardMaterial vertexColors side={THREE.DoubleSide} wireframe={false} roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Optional wireframe overlay for better grid visibility */}
      <mesh>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="index" count={indices.length} array={indices} itemSize={1} />
        </bufferGeometry>
        <meshBasicMaterial color="#333333" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch the exported JSON file
    fetch('/data/alcubierre_expansion.json')
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to load simulation data", err)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050510' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', zIndex: 10, fontFamily: 'sans-serif' }}>
        <h1>WarpTorch Visualizer</h1>
        <p>Alcubierre Warp Bubble: Expansion Scalar (&theta;)</p>
        <p style={{ fontSize: '0.8rem', color: '#888' }}>
          Blue: Expansion (+), Red: Compression (-) <br/>
          Drag to rotate, Scroll to zoom.
        </p>
      </div>

      <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
        <color attach="background" args={['#050510']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} color="#4488ff" />

        {loading ? (
          <Center>
            <Text color="white" fontSize={2}>Loading Simulation...</Text>
          </Center>
        ) : data ? (
          <WarpBubbleSimulation data={data} />
        ) : (
          <Center>
            <Text color="red" fontSize={1}>Error loading data. Check console.</Text>
          </Center>
        )}

        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  )
}

export default App
