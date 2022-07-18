import type { NextPage } from 'next'
import React, { useState } from 'react'
import StartingPoint from '../Components/Editor/StartPoint'

const Home: NextPage = () => {
    const [posX, setPosx] = useState(0)
    const [objects, setObjects] = useState([])

    return (
        <div className="w-[100vw] h-[100vh]">
            <div >
                <StartingPoint />
            </div>
        </div>
    )
}

export default Home
