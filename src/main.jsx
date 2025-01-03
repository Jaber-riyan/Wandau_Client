import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router.jsx'
import Authentication from './Authentication/Authentication.jsx'
import 'animate.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authentication>
      <RouterProvider router={router}></RouterProvider>
    </Authentication>
  </StrictMode>,
)
