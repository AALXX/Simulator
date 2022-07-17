import React from 'react'

function GridFloor(props: any) {
    return (
        <mesh {...props} position={[0, 0, 0]} rotation={[-(Math.PI / 2), 0, 0]}>
            <planeBufferGeometry attach={'geometry'} args={[100, 100]} />
            <meshStandardMaterial attach={'material'} color={'white'} />
        </mesh>
    )
}

export default GridFloor
