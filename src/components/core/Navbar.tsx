// Importing helper modules
import { AuthContext } from 'App'
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import { useContext, useState } from 'react'

const Navbar = () => {
	const { setAuthState } = useContext(AuthContext)
	const [open, setOpen] = useState<boolean>(false)

	function logout() {
		localStorage.removeItem('authToken')
		setAuthState('unauthenticated')
	}

	return (
		<>
			<div className="h-16 fixed right-0 bg-gray-800 w-[calc(100vw_-_240px)] border-b-[1px] border-b-gray-700 spread px-5">
				<span className="material-symbols-outlined text-gray-100 hover:cursor-pointer hover:text-green-500">
					menu
				</span>
				<div className="flex items-center gap-2">
					<span
						className="material-symbols-outlined text-gray-100 hover:text-red-600 duration-300 cursor-pointer"
						onClick={setOpen.bind(this, true)}
					>
						logout
					</span>
				</div>
			</div>
			<Modal
				open={open}
				setOpen={setOpen}
				title="Sign out"
				disabled={false}
				content={
					<div className="mt-5">
						<p className="text-sm text-gray-100">
							Your current session will be terminated and you will need to login
							again
						</p>
						<div className="flex gap-2 mt-4">
							<Button title="Ok" clicked={logout} color="primary" />
							<Button
								title="Cancel"
								color="cancel"
								clicked={setOpen.bind(null, false)}
							/>
						</div>
					</div>
				}
			/>
		</>
	)
}

export default Navbar
