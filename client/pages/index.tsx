import type { NextPage } from 'next'
import React from 'react'
import StartingPoint from '../Components/Editor/StartPoint'

const Home: NextPage = () => {
    return (
        <div className="w-[100vw] h-[100vh]">
            <StartingPoint />
        </div>
    )
}

export default Home