import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*Envolver el elemento padre en un provider para 
    obtener acceso al store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
