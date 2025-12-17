import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Home from './pages/Home.jsx'
import Stats from './pages/Stats.jsx'
import Settings from './pages/Settings.jsx'
import Routines from './pages/Routines.jsx'
import Training from './pages/Training.jsx'
import Finished_training from './pages/Finished_training.jsx'
import CreateRoutine from './pages/Create_routine.jsx'
import NavBar from './layout/navbar'
import MobileNavbar from './components/mobile-navbar.jsx'
import { ThemeContextComponent, Card } from 'azeriand-library'
import TopBar from './layout/top-bar.jsx'
import TrainingContextComponent from './components/training-context.jsx'
import 'azeriand-library/dist/styles.css';
import SettingsContextComponent from './components/settings-context.jsx'
import PopupDiscardFinish from './components/popup-discard-finish.jsx'

function App() {

  const isMobile = useMediaQuery({ query: '(max-width: 48rem)' });

  return(
    <div className='viewport'>
      
      <ThemeContextComponent>
        <TrainingContextComponent>
          <SettingsContextComponent>
            {/* <Gradient/> */}
            <HashRouter>
              <NavBar></NavBar>
              <div style={{height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0}}>
                <TopBar/>
                <Card intensity={500} appearance={isMobile ? 'ghost' : 'glass'} noPadding={isMobile} style={{overflowX: 'hidden', height: '100%', overflowY: 'auto'}} className={isMobile? 'p-[0.5rem]': ''}>
                  <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/stats' element={<Stats/>}></Route>
                    <Route path='/settings' element={<Settings/>}></Route>
                    <Route path='/routines' element={<Routines/>}></Route>
                    <Route path='/training' element={<Training/>}></Route>
                    <Route path='/finished-training' element={<Finished_training/>}></Route>
                    <Route path='/edit-routine' element={<CreateRoutine/>}></Route>
                  </Routes>
                </Card>
                <div className='md:!hidden'>
                  <MobileNavbar/>
                </div>
                  <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-40' style={{backdropFilter: "blur(4px)"}}>
                    <PopupDiscardFinish/>
                  </div>
              </div>
            </HashRouter>
          </SettingsContextComponent>
        </TrainingContextComponent>
      </ThemeContextComponent>

    </div>
  )
}

export default App
