import LeftPanel from '../LeftPanel'
import EditorNavBar from '../Navbar/EditorNavBar'

const EditorLayout = ({ children }: any) => {
    return (
        <>
            <EditorNavBar/>
            
            <div className="flex">
                <LeftPanel />

                <div>
                    <main>{children}</main>
                </div>
            </div>
        </>
    )
}

export default EditorLayout
