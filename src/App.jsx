import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PhotoUpload from './photoUpload'

function App() {
  const [count, setCount] = useState(0)

  const handleAnalysis = async (file) => {
    console.log("Test")
  }

  return (
    <>
      <PhotoUpload />
    </>
  )
}

export default App
