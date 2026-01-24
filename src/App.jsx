import './App.css'
import 'azeriand-library/dist/styles.css';
import AppContent from './AppContent.jsx'
import { useEffect, useRef } from 'react'
import { ThemeContextComponent } from 'azeriand-library'
import { PopupContextComponent } from './components/popup-context.jsx'
import TrainingContextComponent from './components/training-context.jsx'
import SettingsContextComponent from './components/settings-context.jsx'
import backgroundVideo from './assets/background.mp4'

function App() {

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return(
    <div className='grid grid-cols-[320px_1fr] gap-x-[1rem] grid-rows-[100%] h-full ' style={{ position: 'relative', minHeight: '100vh' }}>
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        webkit-playsinline="true"
        x5-playsinline="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.6
        }}
        src={backgroundVideo}
      />
      
      <PopupContextComponent>
        <ThemeContextComponent defaultTheme={{
          theme: 'dark',
          color: 'purple'
        }}>
          <TrainingContextComponent>
            <SettingsContextComponent>
              <AppContent />
            </SettingsContextComponent>
          </TrainingContextComponent>
        </ThemeContextComponent>
      </PopupContextComponent>

    </div>
  )
}

export default App
