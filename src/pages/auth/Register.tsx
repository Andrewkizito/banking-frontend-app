// Importing helper modules
import { updateState } from 'utils/modules'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from 'utils/axios.config'

// Importing core components
import Button from 'components/ui/Button'
import Fade from 'react-reveal/Fade'
import TextInput from 'components/modules/TextInput'

interface FormState {
	readonly [key: string]: string
	name: string
	email: string
	password: string
}

const Register = () => {
	const navigate = useNavigate()

	const [form, setForm] = useState<FormState>({
		name: '',
		email: '',
		password: '',
	})
	const [loading, setLoading] = useState<boolean>(false)

	function submit() {
		setLoading(true)
		setTimeout(async () => {
			try {
				const res = await api.post('/auth/register', {
					name: form.name,
					email: form.email,
					password: form.password,
				})
				toast.success(res.data)
				navigate('/home/login')
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
					Enter your name, email and preferred password. Password must include
					lowercase, uppercase, number and symbol.
					<br />
					Username will be automatically generated.
				</p>
				<div className="flex flex-col gap-4 w-full">
					<TextInput
						label="Name"
						value={form.name}
						placeholder="Your full name"
						disabled={loading}
						setValue={(val) => updateState('name', val, setForm)}
					/>
					<TextInput
						label="Email"
						value={form.email}
						placeholder="Your email"
						disabled={loading}
						setValue={(val) => updateState('email', val, setForm)}
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
						title="Register"
						clicked={submit}
						color="primary"
						loading={loading}
						disabled={loading || !form.name || !form.email || !form.password}
					/>
					<p className="text-sm text-gray-900 font-medium text-center my-5">
						OR
					</p>
					<div className="h-[1px] bg-gray-300 w-full"></div>
					<button
						onClick={() => navigate('/home/login')}
						className="bg-solid py-2 px-10 rounded-sm text-sm text-white duration-300 hover:bg-opacity-80"
					>
						Sign In
					</button>
				</div>
			</div>
		</Fade>
	)
}

export default Register
