import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import StartingPoint from '../Components/Editor/EditorStartPoint'

const Home: NextPage = () => {
    return (
        <div className="flex">
            <div className="flex flex-col w-[15rem] h-[100vh] bg-grey-default absolute z-10">
                <h1 className="text-white self-center mt-2">Selected Object: </h1>
                <hr className="mt-2" />
            </div>
            <div className="w-[100vw] h-[100vh]">
                <StartingPoint />
            </div>
            <div></div>
        </div>
    )
}

export default Home
