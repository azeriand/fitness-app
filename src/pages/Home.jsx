import './Home.css'

import RoutineHistory from '../components/routine-history'
import CalendarView from '../components/common/calendar-view'
import { useContext } from 'react'
import { TrainingContext } from '../components/common/training-context'

export default function Home(){

  const {history} = useContext(TrainingContext)
  const options = ['Item 1', 'Item 2', 'Item 3'];

  const dropdownSelected = (option) => {
    console.log('Elemento seleccionado', option);
  }

  const tabsItems = ['Last Trainings', 'Muscle Groups', 'Per Exercise'];

  return(
    <>
      <p className='page-name'>Home</p>
      <div className='home-container'>
        <div>
          {
            history.map((routine) => <RoutineHistory routine={routine}/>)
          }
        </div>
        <div>
          <CalendarView selectedDates={history}/>
        </div>
      </div>
    </>
  )
}