import type { NextPage } from 'next'
import React from 'react'
import StartingPoint from '../../Components/Editor/EditorStartPoint'
import EditorLayout from '../../Components/Editor/Engine/Gui/Layout/EditorLayout'
import LeftPanel from '../../Components/Editor/Engine/Gui/LeftPanel'

interface EditProjectPageProps {
    projectToken: string
}

const EditProject: NextPage<EditProjectPageProps> = props => {
    return (
        <>
            <EditorLayout>
                <div className="w-[100vw] h-[100vh]">
                    <StartingPoint />
                </div>
            </EditorLayout>
        </>
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
