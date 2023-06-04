// Importing helper modules
import { type Transaction } from 'utils/types'

// Importing core components
import Fade from 'react-reveal/Fade'
import DataCard from '../../Dashboard/sections/partials/DataCard'
import { formatDate } from 'utils/modules'

export interface DataSlot {
	title: string
	value: number | string
	icon: string
	date: string
	time: string
	refreshTag: string
	units?: string
	tagline?: string
	maxValue?: string
}

const Cards: React.FC<{ data: Transaction[] }> = ({ data }) => {
	const currentDate = formatDate(new Date().toISOString())

	const slots: DataSlot[] = [
		{
			title: 'Total Deposits',
			icon: 'account_balance',
			value: data.filter((item) => item.transaction_type === 'deposit').length,
			units: 'Deposits',
			date: currentDate.date,
			time: currentDate.time,
			refreshTag: 'Scanned At',
		},
		{
			title: 'Total Withdraws',
			icon: 'account_balance',
			value: data.filter((item) => item.transaction_type === 'withdraw').length,
			units: 'Withdraws',
			date: currentDate.date,
			time: currentDate.time,
			refreshTag: 'Scanned At',
		},
		{
			title: 'Total Transfers',
			icon: 'account_balance',
			value: data.filter((item) => item.transaction_type === 'transfer').length,
			units: 'Transfers',
			date: currentDate.date,
			time: currentDate.time,
			refreshTag: 'Scanned At',
		},
	]

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
			{slots.map((item, i) => (
				<Fade key={i} delay={i * 200}>
					<DataCard item={item} i={i} />
				</Fade>
			))}
		</div>
	)
}

export default Cards
