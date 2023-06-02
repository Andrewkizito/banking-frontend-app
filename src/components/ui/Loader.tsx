import { Spinner } from 'react-activity'

const Loader = () => {
	return (
		<div className="center">
			<Spinner color="#397d33" speed={1} size={30} />
		</div>
	)
}

export default Loader
