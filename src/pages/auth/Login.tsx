// Importing helper modules
import { AuthContext } from 'App'
import { AuthResponse } from 'utils/types'
import { updateState } from 'utils/modules'
import { toast } from 'react-toastify'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from 'utils/axios.config'

// Importing core components
import Button from 'components/ui/Button'
import Fade from 'react-reveal/Fade'
import TextInput from 'components/modules/TextInput'

interface FormState {
	readonly [key: string]: string
	username: string
	password: string
}

const Login = () => {
	const { setAuthState, setToken } = useContext(AuthContext)
	const navigate = useNavigate()

	const [form, setForm] = useState<FormState>({
		username: '',
		password: '',
	})
	const [loading, setLoading] = useState<boolean>(false)

	function submit() {
		setLoading(true)
		setTimeout(async () => {
			try {
				const res = await api.post('/auth/login', {
					username: form.username,
					password: form.password,
				})
				const data = res.data as AuthResponse
				localStorage.setItem('authToken', data.authToken)
				setToken(data.authToken)
				setAuthState('authenticated')
				toast.success(data.message)
			} catch (error: any) {
				toast.error(error.response.data!)
			}
			setLoading(false)
		}, 4000)
	}

	return (
		<Fade bottom>
			<div>
				<p className="text-sm text-gray-800 font-medium mb-10">
					Log into your account today and manage all your finances in one
					digital place.
				</p>
				<div className="flex flex-col gap-4 w-full">
					<TextInput
						label="Username"
						value={form.username}
						placeholder="Your username"
						disabled={loading}
						setValue={(val) => updateState('username', val, setForm)}
					/>
					<TextInput
						label="Password"
						value={form.password}
						type="password"
						placeholder="Your password"
						disabled={loading}
						setValue={(val) => updateState('password', val, setForm)}
					/>
					<Button
						title="Sign In"
						clicked={submit}
						color="primary"
						loading={loading}
						disabled={loading || !form.username || !form.password}
					/>
					<p className="text-sm text-gray-900 font-medium text-center my-5">
						OR
					</p>
					<div className="h-[1px] bg-gray-300 w-full"></div>
					<button
						onClick={() => navigate('/home/register')}
						className="bg-solid py-2 px-10 rounded-sm text-sm text-white duration-300 hover:bg-opacity-80"
					>
						Create Account
					</button>
				</div>
			</div>
		</Fade>
	)
}

export default Login
