import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface WarpBubbleProps {
  data: any
  metric: string
  velocity: number
  radius: number
  sigma: number
}

function WarpBubble({ data, metric, velocity, radius, sigma }: WarpBubbleProps) {
  const planeRef = useRef<THREE.Mesh>(null)
  const bubbleRef = useRef<THREE.Group>(null)
  const coreMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
  const shellMaterialRef = useRef<THREE.MeshBasicMaterial>(null)

  const current = useRef({ radius: 0, sigma: 1, velocity: 0 })

  const spacetimeSheet = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(60, 60, 150, 150) // Сделали сетку еще плотнее и больше
    geometry.rotateX(-Math.PI / 2) 
    return {
      geometry,
      originalPositions: new Float32Array(geometry.attributes.position.array)
    }
  }, [])

  const targetCoreColor = useMemo(() => new THREE.Color("#00ffff"), [])
  const targetShellColor = useMemo(() => new THREE.Color("#00aaff"), [])

  useEffect(() => {
    if (data && data.statistics) {
      if (metric === 'lentz') {
        // У Ленца положительная энергия. Делаем зелено-желтым.
        const maxEnergy = data.statistics.max || 1
        const intensity = Math.min(1, maxEnergy / 5)
        targetCoreColor.setHSL(0.3 - (intensity * 0.1), 1, 0.5) // от циана к зеленому/желтому
        targetShellColor.setHSL(0.3 - (intensity * 0.1), 1, 0.3)
      } else {
        // У Алькубьерре/Ван Ден Брука отрицательная. Делаем угрожающе красно-фиолетовым.
        const minEnergy = data.statistics.min || -1
        const intensity = Math.min(1, Math.abs(minEnergy) / 5)
        targetCoreColor.setHSL(0.8 - (intensity * 0.8), 1, 0.6)
        targetShellColor.setHSL(0.8 - (intensity * 0.8), 1, 0.3)
      }
    } else {
      targetCoreColor.set("#00ffff")
      targetShellColor.set("#00aaff")
    }
  }, [data, metric, targetCoreColor, targetShellColor])

  useFrame((state) => {
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

    for (let i = 0; i < positions.length / 3; i++) {
      const origX = original[i * 3]
      const origY = original[i * 3 + 1] 
      const origZ = original[i * 3 + 2]

      const rs = Math.sqrt(origX * origX + origZ * origZ)
      let waveHeight = 0

      // РАЗНЫЕ МАТЕМАТИЧЕСКИЕ МОДЕЛИ ДЕФОРМАЦИИ:
      
      if (metric === 'alcubierre') {
        // Классическая волна градиента
        const wallProximity = Math.exp(-Math.pow(rs - rT, 2) / (sT * sT))
        waveHeight = -origX * wallProximity * vT * 0.4
      } 
      else if (metric === 'lentz') {
        // Солитон Ленца: ромбовидная структура (аппроксимация для визуализации)
        // Представляет собой несколько "расходящихся" позитивных волн искажения
        const diamondRs = Math.abs(origX) + Math.abs(origZ)
        const wallProximity = Math.exp(-Math.pow(diamondRs - rT, 2) / (sT * sT))
        // Ленц "толкает" пространство, создавая рябь (косинус)
        waveHeight = wallProximity * vT * 0.8 * Math.cos(origX * 1.5)
        // Поднимаем ядро, так как энергия положительная
        const coreProximity = Math.exp(-Math.pow(rs, 2) / ((rT*0.5) * (rT*0.5)))
        waveHeight += coreProximity * vT * 0.5
      } 
      else if (metric === 'vandenbroeck') {
        // Ван Ден Брук: Волна Алькубьерре на границе + Массивное раздутие внутреннего объема
        const wallProximity = Math.exp(-Math.pow(rs - rT, 2) / (sT * sT))
        const edgeWave = -origX * wallProximity * vT * 0.4
        
        // Внутреннее пространство экстремально проваливается (имитация увеличения объема)
        let internalBulge = 0
        if (rs < rT) {
          // Плавная воронка внутри пузыря
          internalBulge = Math.pow(Math.cos((rs / rT) * (Math.PI / 2)), 2) * (rT * 1.5) * vT
        }
        
        waveHeight = edgeWave - internalBulge
      }

      positions[i * 3 + 1] = origY + waveHeight
    }

    planeRef.current.geometry.attributes.position.needsUpdate = true

    // Анимация самого "корабля"
    if (bubbleRef.current && rT > 0.1) {
      // Для Ван Ден Брука корабль визуально крошечный по сравнению с зоной искажения
      const bubbleScale = metric === 'vandenbroeck' ? rT * 0.3 : rT
      
      bubbleRef.current.scale.setScalar(bubbleScale)
      bubbleRef.current.rotation.x = time * 0.5
      bubbleRef.current.rotation.y = time * 0.3
      bubbleRef.current.visible = true
    } else if (bubbleRef.current) {
      bubbleRef.current.visible = false
    }
  })

  return (
    <group>
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

export default WarpBubble