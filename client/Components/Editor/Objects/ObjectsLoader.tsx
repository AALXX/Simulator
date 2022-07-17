import { useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface ObjLoaderprops {
    fileName: string,
    position?: number[]
}

function ObjectLoader(props: ObjLoaderprops) {
    const object = useLoader(GLTFLoader, props.fileName)

    return (
        <Suspense fallback={null}>
            <primitive object={object.scene} position={props.position}/>
        </Suspense>
    )
}

export default ObjectLoader
