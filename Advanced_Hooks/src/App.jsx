import './App.css'
import { Counter } from './components/Counter'
import { FocusInput } from './components/FocusInput'
import { HomePage } from './components/HomePage'
import NameSaver from './components/NameSaver'
import { Navbar } from './components/Navbar'
import { PreviousValue } from './components/PreviousValue'
import { ThemePage } from './components/ThemePage'
import { ThemeProvider } from './context/ThemeContext'
import { UserProvider } from './context/UserContext'

function App() {

  return (
    <>
      {/* <FocusInput/>
      <PreviousValue/> */}
      {/* <ThemeProvider>
        <ThemePage/>
      </ThemeProvider> */}
      {/* <UserProvider>
        <Navbar/>
        <HomePage/>
      </UserProvider> */}

      <Counter/>
      <NameSaver/>
    </>
  )
}

export default App
