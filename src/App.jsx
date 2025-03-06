import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Stats from './pages/Stats.jsx'
import Settings from './pages/Settings.jsx'
import Train from './pages/Train.jsx'
import NavBar from './layout/navbar'
import Card from './components/card.jsx'
import PortfolioAccess from './layout/portfolio-access.jsx'


function App() {

  return(
    <div className='viewport'>
      <BrowserRouter>
        <NavBar></NavBar>
        <div>
          <PortfolioAccess/>
          <Card>
              <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/stats' element={<Stats/>}></Route>
                <Route path='/settings' element={<Settings/>}></Route>
                <Route path='/train' element={<Train/>}></Route>
              </Routes>
          </Card>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
