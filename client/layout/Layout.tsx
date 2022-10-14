import Footer from '../Components/Footer/Footer'
import NavBar from '../Components/NavBar/NavBar'
import Meta from '../Meta/Meta'

const Layout = ({ children }: any) => {
    return (
        <>
            <Meta />
            <div>
                <main>{children}</main>
            </div>

            <Footer />
        </>
    )
}

export default Layout
