import React, { useEffect, forwardRef } from 'react'
import { Editor } from './Editor'
import { UiDesignEngine } from './Engine/Engine'

const GraphicsCanvas = forwardRef<HTMLCanvasElement>(function Link(
    props: any,
    ref: any
) {
    return <canvas id="editorArea" ref={ref} width={props.Width} />
})

/**
 * This Is Editing Website Ui Space
 * @return {JSX.Element}
 */
const StartingPoint = () => {
    const engine = new UiDesignEngine.Engine()
    const CanvasRef = React.createRef<HTMLCanvasElement>()

    useEffect(() => {
        if (CanvasRef.current != null) {
            engine.start(new Editor(), CanvasRef.current)
        }

        window.onresize = () => {
            engine.resize()
        }
    }, [])

    return (
        <div>
            <GraphicsCanvas ref={CanvasRef} />
        </div>
    )
}

export default StartingPoint
