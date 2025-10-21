import App from './Components/App.jsx'
import ReactDOM from 'react-dom/client'
//import { Provider } from 'react-redux'
import store from './slices/index.js'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18next.js'
import { Provider, ErrorBoundary } from '@rollbar/react'


const rollbarConfig = {
    accessToken: 'ebe2a921609543ff8160a26a5b678576',
    environment: 'testenv',
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store} config={rollbarConfig}>
        <ErrorBoundary>


   
                <I18nextProvider i18n={i18n}>
                    <App />
                </I18nextProvider>


        </ErrorBoundary>
    </Provider>
)