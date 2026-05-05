import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
//render metod is used for 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
