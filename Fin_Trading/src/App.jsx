import { Portfolio } from './components/Portfolio'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Auth } from './components/Auth'
import { Products } from './pages/Products'


function App() {
 
    return(
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/products' element={<Products/>}/>

      </Routes>
       {/* <Dashboard/> */}
        
      </BrowserRouter>
    )
}

export default App
