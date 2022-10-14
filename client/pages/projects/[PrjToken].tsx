import type { NextPage } from 'next'
import React from 'react'
import StartingPoint from '../../Components/Editor/EditorStartPoint'
import LeftPanel from '../../Components/Editor/Engine/Gui/LeftPanel'

interface EditProjectPageProps {
    projectToken: string
}

const EditProject: NextPage<EditProjectPageProps> = props => {
    return (
        <div className="flex">
            <LeftPanel />
            <div className="w-[100vw] h-[100vh]">
                <StartingPoint />
            </div>
            <div></div>
        </div>
    )
}

export default EditProject

/**
 *  get server side props
 * @param {any} context
 * @return {props}
 */
export async function getServerSideProps(context: any) {
    return {
        props: {
            error: false,
            projectToken: context.query.PrjToken
        }
    }
}
