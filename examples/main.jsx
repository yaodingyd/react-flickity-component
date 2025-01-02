import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './global.css'

const domNode = document.getElementById('root');

ReactDOM.createRoot(domNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
