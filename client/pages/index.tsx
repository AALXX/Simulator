import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'

import Box from '../Components/Editor/Objects/EditorCubeTest'
import CameraController from '../Components/Editor/Camera/CameraController'

const Home: NextPage = () => {
    return (
        <div className="w-[100vw] h-[100vh]">
            <Canvas
                shadows={true}
                camera={{
                    position: [1.5, 0, 0]
                }}
            >
                <CameraController />
                <ambientLight intensity={0.5} />
                <Box />
            </Canvas>
        </div>
    )
}

export default Home
