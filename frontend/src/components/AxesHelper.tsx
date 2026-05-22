import * as THREE from 'three'

function AxesHelper({ size = 5 }: { size?: number }) {
  return <primitive object={new THREE.AxesHelper(size)} />
}

export default AxesHelper
