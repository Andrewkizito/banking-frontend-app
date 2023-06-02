// Importing helper modules
import { AuthContext } from 'App'
import { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from 'utils/axios.config'
import routes, { RouteType } from 'utils/routes'

// Importing core components
import { toast } from 'react-toastify'
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import logo from 'assets/images/logo.png'
import TextInput from 'components/modules/TextInput'
import Loader from 'components/ui/Loader'

const Sidebar = () => {
	const { pathname } = useLocation()
	const { token } = useContext(AuthContext)

	const routeSections: RouteType[] = ['general', 'account management']
	const [value, setValue] = useState<number>(0)
	const [open, setOpen] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	async function depositFunds() {
		try {
			setLoading(true)
			const res = await api.post(
				'/users/deposit',
				{ amount: value },
				{
					headers: {
						Authorization: token,
					},
				}
			)
			setValue(0)
			toast.success(res.data)
			setOpen(false)
		} catch (error: any) {
			console.log(error)
			toast.error(error.response.data ? error.response.data : error.message)
		}
		setLoading(false)
	}

	return (
		<>
			<div className="fixed left-0 top-0 bg-gray-800 h-full w-60 p-5">
				<div className="center">
					<img src={logo} alt="" className=" brightness-0 invert h-10 mb-5" />
				</div>
				{routeSections.map((routeType) => (
					<div key={routeType}>
						<h4 className="text-sm text-primary mb-1 font-medium capitalize">
							{routeType}
						</h4>
						<ul className="mb-3">
							{routes
								.filter((item) => item.type === routeType)
								.map((item) => (
									<Link to={item.path}>
										<div
											className={`w-full py-2 px-4 flex items-center gap-2 rounded-sm my-2 duration-300 hover:bg-gray-700 ${
												item.path === pathname ? 'bg-gray-700' : 'bg-inherit'
											}`}
										>
											{item.icon && (
												<i
													className={`${item.icon} text-base text-gray-300`}
												></i>
											)}{' '}
											<p className="text-sm text-gray-300">{item.title}</p>
										</div>
									</Link>
								))}
						</ul>
					</div>
				))}
				<Button
					title="Deposit Funds"
					color="success"
					fullWidth
					clicked={setOpen.bind(null, true)}
				/>
			</div>
			<Modal
				open={open}
				setOpen={setOpen}
				title="Sign out"
				disabled={false}
				content={
					<div className="mt-5">
						{loading ? (
							<div className="center py-10 flex-col gap-2">
								<Loader />
								<p className="text-sm text-gray-300">
									Processing transaction, please wait...
								</p>
							</div>
						) : (
							<>
								<p className="text-sm text-gray-100 mb-3">
									Enter the amount to desposit in your account.
								</p>
								<TextInput
									dark
									type="number"
									label="Amount(USD)"
									value={value.toString()}
									setValue={(val) => setValue(parseInt(val))}
								/>
								<div className="flex gap-2 mt-4">
									<Button
										title="Ok"
										color="primary"
										clicked={depositFunds}
										disabled={!Boolean(value)}
									/>
									<Button
										title="Cancel"
										color="cancel"
										clicked={() => {
											setValue(0)
											setOpen(false)
										}}
									/>
								</div>
							</>
						)}
					</div>
				}
			/>
		</>
	)
}

export default Sidebar
