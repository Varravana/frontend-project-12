import App from './Components/App.jsx'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './slices/index.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
<Provider store = {store}>
    <App />
</Provider>
)