import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoginStatus } from './component/LoginStatus'
import { DashboardWrapper } from './component/DashboardWrapper'

function App() {
  const [isLoading,setIsLoading] = useState(false)
    const handleClick=()=>{
      setIsLoading(prev=>!prev)
    }
  return (
    <>
      <LoginStatus/>
      <button onClick={handleClick}>Log In</button>
      <DashboardWrapper isLoading={isLoading} />

    </>
  )
}

export default App
