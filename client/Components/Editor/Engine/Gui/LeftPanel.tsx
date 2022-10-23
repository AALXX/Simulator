import React, { FC, useEffect, useState } from 'react'
import ObjectTransform from './ObjectComponents/ObjectTransform'

interface LeftPanelProps {}

const LeftPanel: FC<LeftPanelProps> = props => {
    const [objectName, setObjectName] = useState('')
    const [objectTransform, setobjectTransform] = useState({
        scale: {
            x: 0,
            y: 0,
            z: 0
        },
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    })

    const [lastName, setLastName] = useState('')

    //* get object data from engine and set it to frontend
    const SetDataFromEngine = (e: any) => {
        setObjectName(e.detail.name)
        //* scuffed way to force state change
        setobjectTransform({ position: { x: 0, y: 0, z: 0 }, scale: { x: 0, y: 0, z: 0 } })

        setobjectTransform(e.detail.transform)
    }

    //* get object data from engine and set it to frontend
    const UpdateDataFromEngine = (e: any) => {
        //* scuffed way to force state change
        setobjectTransform({ position: { x: 0, y: 0, z: 0 }, scale: { x: 0, y: 0, z: 0 } })
        setobjectTransform(e.detail.transform)
    }

    useEffect(() => {
        window.addEventListener('SelectObject', SetDataFromEngine)
        window.addEventListener(`UpdateObject`, UpdateDataFromEngine)

        return () => {
            window.removeEventListener('SelectObject', SetDataFromEngine)
            window.addEventListener(`UpdateObject`, UpdateDataFromEngine)
        }
    }, [])

    return (
        <div className="flex flex-col w-[15rem] h-[100vh] bg-grey-default fixed ">
            <h1 className="text-white self-center mt-2">Selected Object: {objectName}</h1>
            <hr className="mt-2" />

            <ObjectTransform position={objectTransform.position} scale={objectTransform.scale} />
        </div>
    )
}

export default LeftPanel
