import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import StartingPoint from '../Components/Editor/EditorStartPoint'

const Home: NextPage = () => {
    const test = () => {
        const testEvent: CustomEvent = new CustomEvent('TestEvent', {
            detail: {
                name: 'CUM'
            }
        })
        window.dispatchEvent(testEvent)
    }

    return (
        <div className="flex">
            <div className="flex flex-col w-[15rem] h-[100vh] bg-grey-default absolute z-10">
                <button onClick={test}>CUM</button>
            </div>
            <div className="w-[100vw] h-[100vh]">
                <StartingPoint />
            </div>
            <div></div>
        </div>
    )
}

export default Home
