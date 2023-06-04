import { formatDate } from 'utils/modules'
import type { Transaction, TransactionType } from 'utils/types'

const Listing: React.FC<{ data: Transaction[] }> = ({ data }) => {
	const colors: { [key in TransactionType]: string } = {
		deposit: 'text-green-500',
		withdraw: 'text-red-500',
		transfer: 'text-blue-500',
	}

	return (
		<div className="pt-5">
			<h3 className="py-4 text-gray-300 font-semibold">
				Total Transactions: {data.length}
			</h3>
			<table className="w-full border-collapse">
				<thead>
					<tr className='bg-gray-700 text-gray-300'>
						<th className="px-5 py-2 font-medium">
							ID
						</th>
						<th className="px-5 py-2 font-medium">
							Transaction Type
						</th>
						<th className="px-5 py-2 font-medium">
							Amount
						</th>
						<th className="px-5 py-2 font-medium">
							Date
						</th>
						<th className="px-5 py-2 font-medium">
							Time
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => {
						const transaction_date = formatDate(item.transaction_date)

						return (
							<tr
								key={item.id}
								className="hover:bg-gray-700 cursor-pointer duration-500 border-b border-b-gray-700 text-gray-300"
							>
								<td className="text-sm px-5 py-2 text-center">{item.id}</td>
								<td className="text-sm px-5 py-2 text-center capitalize">
									{item.transaction_type}
								</td>
								<td
									className={`text-sm px-5 py-2 text-center ${
										colors[item.transaction_type as keyof typeof colors]
									}`}
								>
									${item.amount}
								</td>
								<td className="text-sm px-5 py-2 text-center">
									{transaction_date.date}
								</td>
								<td className="text-sm px-5 py-2 text-center">
									{transaction_date.time}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default Listing
