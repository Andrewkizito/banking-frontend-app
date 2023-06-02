// Importing helper modules
import { Outlet } from 'react-router-dom'

// Importing core components
import bg from 'assets/images/login-background.png'
import logo from 'assets/images/logo.png'
import Fade from 'react-reveal/Fade'

const Welcome = () => {
	return (
		<Fade>
			<div className="w-full grid grid-cols-1 md:grid-cols-5">
				<div className="h-sreen bg-white col-span-2 center overflow-hidden">
					<div className="w-4/5">
						<img src={logo} className="h-14 w-auto mb-5" alt="" />
						<Outlet />
					</div>
				</div>
				<div className="col-span-3 h-screen">
					<img
						src={bg}
						className="w-full h-full object-center object-cover"
						alt=""
					/>
				</div>
			</div>
		</Fade>
	)
}

export default Welcome
