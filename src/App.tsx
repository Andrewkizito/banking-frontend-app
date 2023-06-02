// Importing helper modules
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createContext, useCallback, useEffect, useState } from 'react'
import appRoutes, { AuthState } from './utils/routes'
import { ToastContainer } from 'react-toastify'
import api from 'utils/axios.config'

export const AuthContext = createContext<{
	authState: AuthState
	token: string
	setAuthState: (val: AuthState) => void
	setToken: (val: string) => void
}>({
	authState: 'unauthenticated',
	token: '',
	setAuthState(val) {},
	setToken(val) {},
})

const App = () => {
	const [token, setToken] = useState<string>('')
	const [authStatus, setAuthStatus] = useState<AuthState>('unauthenticated')

	const checkAuthState = useCallback(async () => {
		const token = localStorage.getItem('authToken')
		if (token) {
			try {
				await api.post('/auth/verify-session', { token: token })
				setAuthStatus('authenticated')
				setToken(token)
			} catch (error) {
				setAuthStatus('unauthenticated')
				localStorage.removeItem('authToken')
			}
		} else {
			setToken('')
			setAuthStatus('unauthenticated')
		}
	}, [])

	useEffect(() => {
		checkAuthState()
	})

	return (
		<AuthContext.Provider
			value={{
				authState: authStatus,
				token: token,
				setToken: (val) => setToken(val),
				setAuthState: (val) => setAuthStatus(val),
			}}
		>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			<BrowserRouter>
				<Routes>
					{appRoutes
						.filter((item) => item.guarded === authStatus)
						.map((item, i: number) => {
							if (item.nested)
								return (
									<Route key={i} path={item.path} element={item.component}>
										{item.nested.map((item, i: number) => (
											<Route
												path={item.path}
												key={i}
												element={item.component}
											/>
										))}
									</Route>
								)
							return <Route key={i} path={item.path} element={item.component} />
						})}
					<Route
						path="*"
						element={
							<Navigate
								to={
									authStatus === 'unauthenticated'
										? '/home/login'
										: '/dashboard'
								}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App
