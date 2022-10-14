import Link from 'next/link'
import React from 'react'

export default function ProjectCard(props: { name: string; token: string }) {
    return (
        <>
            <Link href={`projects/${props.token}`}>
                <div className="flex flex-col h-full bg-darker-grey cursor-pointer">
                    <h1 className="text-white self-center mt-5">{props.name}</h1>
                </div>
            </Link>
        </>
    )
}
