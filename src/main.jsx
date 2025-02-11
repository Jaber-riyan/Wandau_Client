import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router.jsx'
import Authentication from './Authentication/Authentication.jsx'
import 'animate.css';
import { ToastContainer } from 'react-toastify'
import ThemeProvider from './ThemeProvider/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authentication>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true} />
      </ThemeProvider>
    </Authentication>
  </StrictMode>,
)
