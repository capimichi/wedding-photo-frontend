import './App.css'
import { ServicesProvider } from './servicesContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'


function App() {
  return (
    <>
      <ServicesProvider>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </ServicesProvider>
    </>
  )
}

export default App
