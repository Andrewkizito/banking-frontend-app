// Importing helper modules
import { AccountSummary } from 'utils/types'

// Importing core components
import Fade from 'react-reveal/Fade'
import DataCard from './partials/DataCard'
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

const Cards: React.FC<{ data: AccountSummary }> = ({ data }) => {
	const currentDate = formatDate(new Date().toISOString())

	const slots: DataSlot[] = [
		{
			title: 'Account Balance',
			icon: 'account_balance',
			value: data.balance,
			units: 'USD',
			date: currentDate.date,
			time: currentDate.time,
			refreshTag: 'Scanned At',
		},
		{
			title: 'Transactions',
			icon: 'receipt_long',
			value: data.total_transactions,
			units: 'in Total',
			date: currentDate.date,
			time: currentDate.time,
			refreshTag: 'Scanned At',
		},
		{
			title: 'Last Transaction',
			icon: 'payments',
			value: data.lastTransaction.amount!,
			units: `usd / Type: ${data.lastTransaction.transaction_type!} `,
			date: formatDate(data.lastTransaction.transaction_date!).date,
			time: formatDate(data.lastTransaction.transaction_date!).time,
			refreshTag: 'Recorded At',
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
