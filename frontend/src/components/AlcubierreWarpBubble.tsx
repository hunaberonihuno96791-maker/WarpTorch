import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AlcubierreWarpBubbleProps {
  data: any
  velocity: number
  radius: number
  sigma: number
}

function AlcubierreWarpBubble({ data, velocity = 1.5, radius = 6, sigma = 4 }: AlcubierreWarpBubbleProps) {
  const meshRef = useRef<THREE.Points>(null)
  const bubbleRef = useRef<THREE.Mesh>(null)

  // Create particles for spacetime visualization
  const particles = useMemo(() => {
    const count = 5000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Default color
      colors[i * 3] = 0.3
      colors[i * 3 + 1] = 0.5
      colors[i * 3 + 2] = 1.0
    }

    return { positions, colors }
  }, [])

  // Alcubierre warp function
  const alcubierreMetric = (x: number, y: number, z: number, t: number) => {
    const rs = Math.sqrt(x * x + y * y + z * z)
    const warpFactor = Math.tanh((rs + radius) / sigma) - Math.tanh((rs - radius) / sigma)
    const energyDensity = -(warpFactor * warpFactor) / (2 * sigma * sigma)
    return { warpFactor, energyDensity, rs }
  }

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array
    const colors = meshRef.current.geometry.attributes.color.array as Float32Array

    for (let i = 0; i < positions.length / 3; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]

      // Move warp bubble along x-axis
      const bubbleCenter = (Math.sin(time * 0.2) * 8)

      const { warpFactor, energyDensity, rs } = alcubierreMetric(
        x - bubbleCenter,
        y,
        z,
        time
      )

      // Visualize spacetime distortion
      const distortion = warpFactor * 0.5
      positions[i * 3 + 1] = y + Math.sin(x * 0.5 + time) * distortion * 0.3
      positions[i * 3 + 2] = z + Math.cos(y * 0.5 + time) * distortion * 0.3

      // Color based on energy density
      const energyIntensity = Math.abs(energyDensity) * 5
      colors[i * 3] = Math.min(1, energyIntensity) // Red (positive energy)
      colors[i * 3 + 1] = 0.2
      colors[i * 3 + 2] = Math.min(1, -energyDensity * 2) // Blue (negative energy)
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.geometry.attributes.color.needsUpdate = true

    // Rotate bubble
    if (bubbleRef.current) {
      bubbleRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group>
      {/* Spacetime particles */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Warp bubble boundary */}
      <mesh ref={bubbleRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Energy field glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[radius * 1.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff00ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

export default AlcubierreWarpBubble
