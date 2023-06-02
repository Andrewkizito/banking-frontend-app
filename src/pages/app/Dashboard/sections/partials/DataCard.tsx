import { DataSlot } from '../Cards'

interface Gradient {
	[key: number]: string
}

const DataCard: React.FC<{ item: DataSlot; i: number }> = (props) => {
	const gradients: Gradient = {
		0: 'bg-gradient-to-r from-orange-500 to-red-500',
		1: 'bg-gradient-to-r from-green-700 to-green-400',
		2: 'bg-gradient-to-r from-blue-700 to-blue-400',
		3: 'bg-gradient-to-r from-sky-700 to-sky-400',
		4: 'bg-gradient-to-r from-teal-700 to-teal-500',
		5: 'bg-gradient-to-r from-red-500 to-pink-500',
	}

	return (
		<div className="bg-gray-800 rounded-sm px-5 pt-7 pb-2">
			<div className="spread">
				<div className={`${gradients[props.i]} w-16 h-16 center rounded-full`}>
					<span className="material-symbols-outlined text-white data-icon">
						{props.item.icon}
					</span>
				</div>
				<div className=" flex items-end flex-col gap-2">
					<h4 className="text-base font-normal text-gray-100">
						{props.item.title}
					</h4>
					<p className="text-2xl text-gray-300">
						{props.item.value}{' '}
						{
							<span className=" text-sm font-light">
								{props.item.tagline} {props.item.units}{' '}
								{props.item.maxValue && ` / ${props.item.maxValue}`}
							</span>
						}
					</p>
				</div>
			</div>
			<div className="mt-5 bg-gray-700 w-full h-[0.5px]"></div>
			<div className="flex items-center gap-2 pt-1">
				<span className="material-symbols-outlined text-gray-400">
					check_circle
				</span>
				<p className="text-[13px] text-gray-400">
					{props.item.refreshTag}:
					<span className="text-green-400 ml-1">
						{props.item.date}
						{' / '}
						{props.item.time}
					</span>
				</p>
			</div>
		</div>
	)
}

export default DataCard
