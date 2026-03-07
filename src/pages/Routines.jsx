
import RoutineCard from "../components/routine-card"
import { SectionName, Button } from 'azeriand-library'
import { useContext } from "react"
import { Helmet } from "react-helmet"
import { TrainingContext } from "../components/training-context"
import { useNavigate } from "react-router-dom"

export default function Train(){

  const { updatedRoutineList, limitMaxRoutines } = useContext(TrainingContext)
  const navigate = useNavigate();

  function newRoutine(){
    if (updatedRoutineList.length == limitMaxRoutines) {
      alert(`You can only have a maximum of ${limitMaxRoutines} routines. Please delete an existing routine before adding a new one.`);
      return;
    }
    else {
      navigate('/edit-routine')
    }
  }

  return(
    <>
      <Helmet>
        <title>Routines | Fitness App</title>
      </Helmet>
      <section className="flex flex-col align-center gap-y-4">
        <div>
          <p className='text-start text-[2rem] font-bold text-purple-200 m-0'>Train</p>
          <SectionName section='Routines'/>
        </div>
        <Button label='New Routine' appearance='outlined' onClick={newRoutine} className='rounded-lg'/>
      </section>
      <div className="grid grid-cols-3 auto-rows-fr justify-stretch mt-[1rem] gap-[1.5rem]">
        {updatedRoutineList.reverse().map((routine, index) => <RoutineCard key={index} exercises={routine.exercises} label={routine.routine_name} timeAgo='Last time: 4 years ago.'/>) }
      </div>
    </>
  )
}