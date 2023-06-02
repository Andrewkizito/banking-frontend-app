export const updateState = (field: string, value: string, setValue: any) => {
	setValue((prevState: any) => ({
		...prevState,
		[field]: value,
	}))
}

export const formatDate = (
	dateString: string
): { date: string; time: string } => {
	const dateObj = new Date(dateString)

	const formattedDate = dateObj
		.toLocaleDateString('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
		.replace(/\//g, '-')

	const formattedTime = dateObj.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	})

	return { date: formattedDate, time: formattedTime }
}
