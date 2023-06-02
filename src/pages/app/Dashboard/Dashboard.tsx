// Importing helper modules
import api from 'utils/axios.config'
import { AuthContext } from 'App'
import type { AccountSummary } from 'utils/types'
import { toast } from 'react-toastify'
import { useCallback, useContext, useEffect, useState } from 'react'

// Importing core components
import Cards from './sections/Cards'
import Fade from 'react-reveal/Fade'
import Loader from 'components/ui/Loader'

const Dashboard = () => {
	const { token } = useContext(AuthContext)
	const [data, setData] = useState<AccountSummary>()
	const [loading, setLoading] = useState<boolean>(true)

	const fetchData = useCallback(async () => {
		if (loading) {
			try {
				const res = await api.get('/users/account-summary', {
					headers: {
						Authorization: token,
					},
				})
				const data = res.data as AccountSummary
				setData(data)
			} catch (error: any) {
				toast.error(error.response.data ? error.response.data : error.message)
			}
			setLoading(false)
		}
	}, [token, loading])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	if (loading)
		return (
			<div className="w-full h-full center">
				<Loader />
			</div>
		)

	return (
		<>
			{data && (
				<Fade>
					<Cards data={data} />
				</Fade>
			)}
		</>
	)
}

export default Dashboard
