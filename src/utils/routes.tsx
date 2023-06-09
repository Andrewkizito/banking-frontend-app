import { ReactElement } from 'react'

// Auth screens
import Login from 'pages/auth/Login'
import Register from 'pages/auth/Register'
import Welcome from '../pages/auth/Welcome'

// Core components
import Layout from 'components/core/Layout'

// Importing main pages
import Dashboard from 'pages/app/Dashboard/Dashboard'
import Transactions from 'pages/app/Transactions/Transactions'

export type AuthState = 'authenticated' | 'unauthenticated'

export type RouteType = 'general' | 'account management'

interface Route {
	title: string
	path: string
	component: ReactElement
	guarded: AuthState
	icon?: string
	type?: RouteType
	nested?: {
		path: string
		component: ReactElement
	}[]
}

const routes: Route[] = [
	{
		title: 'Welcome',
		path: '/home',
		guarded: 'unauthenticated',
		component: <Welcome />,
		nested: [
			{
				path: 'login',
				component: <Login />,
			},
			{
				component: <Register />,
				path: 'register',
			},
		],
	},
	{
		title: 'Dashboard',
		path: '/dashboard',
		component: (
			<Layout>
				<Dashboard />
			</Layout>
		),
		guarded: 'authenticated',
		type: 'general',
		icon: 'icofont-dashboard',
	},
	{
		title: 'Transactions',
		path: '/transactions',
		component: (
			<Layout>
				<Transactions />
			</Layout>
		),
		guarded: 'authenticated',
		type: 'account management',
		icon: 'icofont-bank-alt',
	},
]

export default routes
