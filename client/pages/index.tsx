import type { NextPage } from 'next'
import axios from 'axios'
import React, { useEffect } from 'react'
import ProjectCard from '../Components/OpenProjects/ProjectsCard'

interface HomePageProps {
    allProjects: [
        {
            projectName: string
        }
    ]
}

const Home: NextPage<HomePageProps> = props => {
    return (
        <div className="flex flex-col">
            <h1 className="text-white self-center mt-10 text-[1.8rem]">Open A Project</h1>
            <div className="grid grid-cols-4 gap-4 border-2 h-[40rem] w-[90%] self-center  mt-10 overflow-y-scroll">
                {props.allProjects.map((project: any, index: number) => (
                    <div key={index}>
                        <ProjectCard name={project.ProjectName} token={project.ProjectToken} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home

/**
 *  get server side props
 * @return {props}
 */
export async function getServerSideProps() {
    const allProjects = await axios.get(`${process.env.SERVER_BACKEND}/get-projects/data`)

    return {
        props: {
            error: false,
            allProjects: allProjects.data.projects
        }
    }
}
