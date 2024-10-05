import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Preferences from './Preferences.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Preferences />
  </StrictMode>,
)
