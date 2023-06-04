// Importing
import { AuthContext } from 'App'
import { useCallback, useContext, useEffect, useState } from 'react'
import { type Transaction } from 'utils/types'
import api from 'utils/axios.config'

// Importing core components
import { toast } from 'react-toastify'
import Fade from 'react-reveal/Fade'
import Loader from 'components/ui/Loader'
import Cards from './sections/Cards'
import Listing from './sections/Listing'

const Transactions = () => {
	const { token } = useContext(AuthContext)
	const [data, setData] = useState<Transaction[]>()
	const [loading, setLoading] = useState<boolean>(true)

	const fetchData = useCallback(async () => {
		if (loading) {
			try {
				const res = await api.get('/users/transactions', {
					headers: {
						Authorization: token,
					},
				})
				const data = res.data as Transaction[]
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

	console.log(data)

	return (
		<>
			{data && (
				<Fade>
					<Cards data={data} />
					<Listing data={data} />
				</Fade>
			)}
		</>
	)
}

export default Transactions
