import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Stats from './pages/Stats.jsx'
import Settings from './pages/Settings.jsx'
import Routines from './pages/Routines.jsx'
import Training from './pages/Training.jsx'
import NavBar from './layout/navbar'
import Card from './components/common/card.jsx'
import PortfolioAccess from './layout/portfolio-access.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Gradient from './components/common/gradient.jsx'
import TopBar from './layout/top-bar.jsx'

//Envolviendo todos los componentes en el 'entorno' para que puedan usar el contexto
import ThemeContextComponent from './components/common/theme-context.jsx'
import TrainingContextComponent from './components/common/training-context.jsx'


function App() {

  return(
    <div className='viewport'>
      <ThemeContextComponent>
        <TrainingContextComponent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <Gradient/> */}
            <BrowserRouter>
              <NavBar></NavBar>
              <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <TopBar/>
                <Card intensity={500} style={{overflowX: 'hidden', height: '100%', overflowY: 'auto'}}>
                    <Routes>
                      <Route path='/' element={<Home/>}></Route>
                      <Route path='/stats' element={<Stats/>}></Route>
                      <Route path='/settings' element={<Settings/>}></Route>
                      <Route path='/routines' element={<Routines/>}></Route>
                      <Route path='/training' element={<Training/>}></Route>
                    </Routes>
                </Card>
              </div>
            </BrowserRouter>
          </LocalizationProvider>
        </TrainingContextComponent>
      </ThemeContextComponent>
    </div>
  )
}

export default App
