import './App.css'
import 'azeriand-library/dist/styles.css';
import AppContent from './AppContent.jsx'
import { ThemeContextComponent } from 'azeriand-library'
import { PopupContextComponent } from './components/popup-context.jsx'
import TrainingContextComponent from './components/training-context.jsx'
import SettingsContextComponent from './components/settings-context.jsx'

function App() {
  return(
    <div className='viewport'>
      
      <PopupContextComponent>
        <ThemeContextComponent>
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
