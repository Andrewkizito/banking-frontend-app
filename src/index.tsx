import ReactDOM from 'react-dom/client'

import App from './App'
import reportWebVitals from './reportWebVitals'

// Importing styles
import './index.css'
import 'assets/icons/icofont.min.css'
import 'react-activity/dist/library.css'
import 'react-toastify/dist/ReactToastify.min.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)

reportWebVitals()
