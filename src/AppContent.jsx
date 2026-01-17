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
import { Card } from 'azeriand-library'
import TopBar from './layout/top-bar.jsx'
import PopupDiscardFinish from './components/popup-discard-finish.jsx'
import { usePopup } from './components/popup-context.jsx'

export default function AppContent() {

    const isMobile = useMediaQuery({ query: '(max-width: 48rem)' });
    const { isPopupOpen } = usePopup();

  return (
    <HashRouter>
      <NavBar />

      <div className='h-full min-h-0 flex flex-col'>
        <TopBar />

        <Card intensity={900} blur={40} appearance={isMobile ? 'ghost' : 'glass'} noPadding={isMobile} style={{overflowX: 'hidden', height: '100%', overflowY: 'auto'}} className={isMobile? 'p-[0.5rem]': '!pb-0'}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/stats' element={<Stats />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/routines' element={<Routines />} />
            <Route path='/training' element={<Training />} />
            <Route path='/finished-training' element={<Finished_training />} />
            <Route path='/edit-routine' element={<CreateRoutine />} />
          </Routes>
        </Card>

        <div className='md:!hidden'>
          <MobileNavbar />
        </div>

        {isPopupOpen && (
          <div className='fixed flex inset-0 bg-black/60 backdrop-blur-lg items-center justify-center z-40'>
            <PopupDiscardFinish />
          </div>
        )}
      </div>
    </HashRouter>
  );
}
