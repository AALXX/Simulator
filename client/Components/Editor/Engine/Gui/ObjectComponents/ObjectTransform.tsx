import React, { FC } from 'react'

export interface ObjectTransformProps {
    position: {
        x: number
        y: number
        z: number
    }
    scale: {
        x: number
        y: number
        z: number
    }
}

const ObjectTransform: FC<ObjectTransformProps> = props => {
    return (
        <div className="flex border-2 mt-3 h-[10rem] flex-col">
            <h1 className="text-white self-center">Transform</h1>
            <h1 className="text-white mt-3">Position</h1>
            <div className="flex ">
                <h1 className="text-white ml-10 ">x: {Math.trunc(props.position.x)}</h1>
                <h1 className="text-white ml-10 ">y: {Math.trunc(props.position.y)}</h1>
                <h1 className="text-white ml-10 ">z: {Math.trunc(props.position.z)}</h1>
            </div>
            <h1 className="text-white mt-3">Scale</h1>
            <div className="flex ">
                <h1 className="text-white ml-10 ">x: {Math.trunc(props.scale.x)}</h1>
                <h1 className="text-white ml-10 ">y: {Math.trunc(props.scale.y)}</h1>
                <h1 className="text-white ml-10 ">z: {Math.trunc(props.scale.z)}</h1>
            </div>
        </div>
    )
}

export default ObjectTransform
