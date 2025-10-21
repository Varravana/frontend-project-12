import App from './Components/App.jsx'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './slices/index.js'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18next.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </Provider>
)