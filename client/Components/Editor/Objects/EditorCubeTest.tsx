import React from 'react'

function Box(props: any) {
    return (
        <mesh {...props} recieveShadow={true}>
            <boxBufferGeometry attach={'geometry'} />
            <meshPhysicalMaterial attach={'material'} color="white" />
        </mesh>
    )
}

export default Box
