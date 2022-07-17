import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import CameraController from '../Components/Editor/Camera/CameraController'
import GridFloor from '../Components/Editor/Utilities/GridFloor/GridFloor'
import ObjectLoader from '../Components/Editor/Objects/ObjectsLoader'
import React, { useState } from 'react'

const Home: NextPage = () => {
    const [posX, setPosx] = useState(0)
    const [objects, setObjects] = useState(0)

    return (
        <div className="w-[100vw] h-[100vh]">
            <Canvas
                shadows={true}
                camera={{
                    position: [4, 1, 4]
                }}
            >
                <CameraController />
                <ObjectLoader fileName={'monke.glb'} position={[posX, 1, 0]} />
                <ambientLight intensity={0.5} />
                <spotLight
                    intensity={0.9}
                    angle={0.1}
                    penumbra={1}
                    position={[10, 15, 10]}
                    castShadow
                />
                <GridFloor />
                <primitive object={new THREE.AxesHelper(10)} />
            </Canvas>
            <button
                onClick={() => {
                    setPosx(posX + 0.1)
                }}
            >
                TEST
            </button>
        </div>
    )
}

export default Home
