
import RoutineHistory from '../components/routine-history'
import { Calendar } from 'azeriand-library'
import { useContext } from 'react'
import { TrainingContext } from '../components/training-context'

export default function Home(){

  const {history} = useContext(TrainingContext)
  const options = ['Item 1', 'Item 2', 'Item 3'];

  const tabsItems = ['Last Trainings', 'Muscle Groups', 'Per Exercise'];

  return(
    <>
      <p className='text-start text-[2rem] font-bold'>Your latest Trainings</p>
      <div className='grid grid-cols-[70%_30%] grid-rows-[100%] gap-x-[1rem] mt-[2rem]'>
        <div className='flex flex-col gap-y-[1rem]'>
          {
            history.slice(0, 6).map((routine) => <RoutineHistory key={routine.day} routine={routine}/>)
          }
        </div>
        <div>
          <Calendar selectedDates={history}/>
        </div>
      </div>
    </>
  )
}