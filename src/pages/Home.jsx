
import RoutineHistory from '../components/routine-history'
import CalendarView from '../components/common/calendar-view'
import { useContext } from 'react'
import { TrainingContext } from '../components/common/training-context'

export default function Home(){

  const {history} = useContext(TrainingContext)
  const options = ['Item 1', 'Item 2', 'Item 3'];

  const tabsItems = ['Last Trainings', 'Muscle Groups', 'Per Exercise'];

  return(
    <>
      <p className='text-start text-[2rem] font-bold m-0 pb-[1rem]'>Home</p>
      <div className='grid grid-cols-[70%_30%] grid-rows-[100%] gap-x-[1rem]'>
        <div>
          {
            history.slice(0, 6).map((routine) => <RoutineHistory key={routine} routine={routine}/>)
          }
        </div>
        <div>
          <CalendarView selectedDates={history}/>
        </div>
      </div>
    </>
  )
}