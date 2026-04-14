import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MyCanvas from './Modules/MyCanvas.js'
import Cube from './Modules/Cube'

const myCanvas = MyCanvas.create(document.body, { id: 'canvas' });
Cube(myCanvas);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
