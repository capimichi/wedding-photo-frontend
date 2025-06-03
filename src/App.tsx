import './App.css'
import { ServicesProvider } from './servicesContext'
import PhotoUpload from './components/PhotoUpload'


function App() {

  return (
    <>
      <ServicesProvider>
        <div className="app">
          <PhotoUpload />
        </div>
      </ServicesProvider>
    </>
  )
}

export default App
