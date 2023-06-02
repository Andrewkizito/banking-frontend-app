// Importing helper modules
import { ReactElement } from 'react'

// Importing core components
import Sidebar from './Sidebar'
import Navbar from './Navbar'

interface LayoutProps {
	children: ReactElement
}

const Layout: React.FC<LayoutProps> = (props) => {
	return (
		<div className="h-screen w screen relative bg-gray-900 bg-opacity-95">
			<Sidebar />
			<Navbar />
			<div className="right-0 absolute bottom-0 w-[calc(100vw_-_240px)] h-[calc(100vh_-_64px)] p-5">
				{props.children}
			</div>
		</div>
	)
}

export default Layout
