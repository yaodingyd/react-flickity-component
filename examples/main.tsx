import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './global.css'

const domNode = document.getElementById('root')!

createRoot(domNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
