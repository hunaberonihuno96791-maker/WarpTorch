import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AlcubierreWarpBubbleProps {
  data: any
  velocity: number
  radius: number
  sigma: number
}

function AlcubierreWarpBubble({ data: _data, velocity: _velocity = 1.5, radius = 6, sigma = 4 }: AlcubierreWarpBubbleProps) {
  const gridRef = useRef<THREE.LineSegments>(null)
  const bubbleRef = useRef<THREE.Mesh>(null)

  // Create lightweight spacetime grid
  const spacetimeGrid = useMemo(() => {
    const gridSize = 20
    const divisions = 8 // Reduced from 20 for better performance
    const points: number[] = []

    // Create grid lines along X axis
    for (let i = 0; i <= divisions; i++) {
      const z = (i / divisions - 0.5) * gridSize
      for (let j = 0; j <= divisions; j++) {
        const y = (j / divisions - 0.5) * gridSize
        const x1 = -gridSize / 2
        const x2 = gridSize / 2
        points.push(x1, y, z, x2, y, z)
      }
    }

    // Create grid lines along Y axis
    for (let i = 0; i <= divisions; i++) {
      const z = (i / divisions - 0.5) * gridSize
      for (let j = 0; j <= divisions; j++) {
        const x = (j / divisions - 0.5) * gridSize
        const y1 = -gridSize / 2
        const y2 = gridSize / 2
        points.push(x, y1, z, x, y2, z)
      }
    }

    // Create grid lines along Z axis
    for (let i = 0; i <= divisions; i++) {
      const y = (i / divisions - 0.5) * gridSize
      for (let j = 0; j <= divisions; j++) {
        const x = (j / divisions - 0.5) * gridSize
        const z1 = -gridSize / 2
        const z2 = gridSize / 2
        points.push(x, y, z1, x, y, z2)
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))

    return { geometry, originalPositions: new Float32Array(points) }
  }, [])

  // Alcubierre warp function
  const alcubierreMetric = (x: number, y: number, z: number, _t: number) => {
    const rs = Math.sqrt(x * x + y * y + z * z)
    const warpFactor = Math.tanh((rs + radius) / sigma) - Math.tanh((rs - radius) / sigma)
    const energyDensity = -(warpFactor * warpFactor) / (2 * sigma * sigma)
    return { warpFactor, energyDensity, rs }
  }

  useFrame((state) => {
    if (!gridRef.current) return

    const time = state.clock.elapsedTime
    const positions = gridRef.current.geometry.attributes.position.array as Float32Array
    const original = spacetimeGrid.originalPositions

    // Move warp bubble along x-axis
    const bubbleCenter = Math.sin(time * 0.2) * 8

    for (let i = 0; i < positions.length / 3; i++) {
      const origX = original[i * 3]
      const origY = original[i * 3 + 1]
      const origZ = original[i * 3 + 2]

      const { warpFactor } = alcubierreMetric(
        origX - bubbleCenter,
        origY,
        origZ,
        time
      )

      // Apply spacetime distortion to grid
      const distortion = warpFactor * 0.8
      positions[i * 3] = origX + distortion * 0.5
      positions[i * 3 + 1] = origY + Math.sin(origX * 0.3 + time) * distortion * 0.4
      positions[i * 3 + 2] = origZ + Math.cos(origY * 0.3 + time) * distortion * 0.4
    }

    gridRef.current.geometry.attributes.position.needsUpdate = true

    if (bubbleRef.current) {
      bubbleRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group>
      {/* Spacetime grid - visualizes distortion */}
      <lineSegments ref={gridRef} geometry={spacetimeGrid.geometry}>
        <lineBasicMaterial
          color="#00aaff"
          transparent
          opacity={0.4}
          linewidth={1}
        />
      </lineSegments>

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
