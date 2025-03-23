import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Stats from './pages/Stats.jsx'
import Settings from './pages/Settings.jsx'
import Train from './pages/Train.jsx'
import NavBar from './layout/navbar'
import Card from './components/common/card.jsx'
import PortfolioAccess from './layout/portfolio-access.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Gradient from './components/common/gradient.jsx'


function App() {

  return(
    <div className='viewport'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Gradient/>
        <BrowserRouter>
          <NavBar></NavBar>
          <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <PortfolioAccess/>
            <Card intensity={500} style={{overflow: 'scroll', height: '100%', overflowY: 'auto'}}>
                <Routes>
                  <Route path='/' element={<Home/>}></Route>
                  <Route path='/stats' element={<Stats/>}></Route>
                  <Route path='/settings' element={<Settings/>}></Route>
                  <Route path='/train' element={<Train/>}></Route>
                </Routes>
            </Card>
          </div>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  )
}

export default App
