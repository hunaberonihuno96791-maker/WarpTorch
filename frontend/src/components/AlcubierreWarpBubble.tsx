import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AlcubierreWarpBubbleProps {
  data: any
  velocity: number
  radius: number
  sigma: number
}

function AlcubierreWarpBubble({ data, velocity, radius, sigma }: AlcubierreWarpBubbleProps) {
  const planeRef = useRef<THREE.Mesh>(null)
  const bubbleRef = useRef<THREE.Group>(null)
  const coreMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
  const shellMaterialRef = useRef<THREE.MeshBasicMaterial>(null)

  const current = useRef({ radius: 0, sigma: 1, velocity: 0 })

  // Создаем плотно разбитую плоскость, чтобы вершины могли изгибаться (100x100 сегментов)
  const spacetimeSheet = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(50, 50, 100, 100)
    geometry.rotateX(-Math.PI / 2) // Кладем плоскость горизонтально
    return {
      geometry,
      originalPositions: new Float32Array(geometry.attributes.position.array)
    }
  }, [])

  const targetCoreColor = useMemo(() => new THREE.Color("#00ffff"), [])
  const targetShellColor = useMemo(() => new THREE.Color("#00aaff"), [])

  useEffect(() => {
    if (data && data.statistics) {
      const minEnergy = data.statistics.min
      const intensity = Math.min(1, Math.abs(minEnergy) / 5)
      targetCoreColor.setHSL(0.8 - (intensity * 0.8), 1, 0.6)
      targetShellColor.setHSL(0.8 - (intensity * 0.8), 1, 0.3)
    } else {
      targetCoreColor.set("#00ffff")
      targetShellColor.set("#00aaff")
    }
  }, [data, targetCoreColor, targetShellColor])

  useFrame((state) => {
    // Плавная интерполяция
    current.current.radius = THREE.MathUtils.lerp(current.current.radius, radius, 0.05)
    current.current.sigma = THREE.MathUtils.lerp(current.current.sigma, sigma, 0.05)
    current.current.velocity = THREE.MathUtils.lerp(current.current.velocity, velocity, 0.05)

    if (coreMaterialRef.current) coreMaterialRef.current.color.lerp(targetCoreColor, 0.05)
    if (shellMaterialRef.current) shellMaterialRef.current.color.lerp(targetShellColor, 0.05)

    if (!planeRef.current) return

    const time = state.clock.elapsedTime
    const positions = planeRef.current.geometry.attributes.position.array as Float32Array
    const original = spacetimeSheet.originalPositions

    const rT = current.current.radius
    const sT = current.current.sigma
    const vT = current.current.velocity

    // Искривление "резинового листа" пространства
    for (let i = 0; i < positions.length / 3; i++) {
      const origX = original[i * 3]
      const origY = original[i * 3 + 1] 
      const origZ = original[i * 3 + 2]

      const rs = Math.sqrt(origX * origX + origZ * origZ)

      // Визуализация скаляра расширения (Theta). 
      // Пространство сильнее всего деформируется на границе пузыря (rs ≈ rT).
      // Формируем Гауссиан на стенке пузыря.
      const wallProximity = Math.exp(-Math.pow(rs - rT, 2) / (sT * sT))

      // Смещение по высоте (ось Y):
      // Спереди (X > 0) пространство сжимается (проваливается вниз)
      // Сзади (X < 0) пространство расширяется (выдавливается наверх)
      const waveHeight = -origX * wallProximity * vT * 0.4

      positions[i * 3 + 1] = origY + waveHeight
    }

    planeRef.current.geometry.attributes.position.needsUpdate = true

    if (bubbleRef.current && rT > 0.1) {
      bubbleRef.current.scale.setScalar(rT)
      bubbleRef.current.rotation.x = time * 0.5
      bubbleRef.current.rotation.y = time * 0.3
      bubbleRef.current.visible = true
    } else if (bubbleRef.current) {
      bubbleRef.current.visible = false
    }
  })

  return (
    <group>
      {/* Теперь это единая сетка, которая по-настоящему изгибается */}
      <mesh ref={planeRef} geometry={spacetimeSheet.geometry}>
        <meshBasicMaterial
          color="#0055aa"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      <group ref={bubbleRef}>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            ref={shellMaterialRef}
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshBasicMaterial
            ref={coreMaterialRef}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      </group>
    </group>
  )
}

export default AlcubierreWarpBubble