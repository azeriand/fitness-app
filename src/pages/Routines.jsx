
import RoutineCard from "../components/routine-card"
import { SectionName, Button } from 'azeriand-library'
import { useContext } from "react"
import { Helmet } from "react-helmet"
import { TrainingContext } from "../components/training-context"
import { useNavigate } from "react-router-dom"

export default function Train(){

  const { routinesList } = useContext(TrainingContext)
  const navigate = useNavigate();

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
        <Button label='New Routine' appearance='outlined' onClick={() => navigate('/edit-routine')} className='rounded-lg'/>
      </section>
      <div className="grid grid-cols-3 auto-rows-fr justify-stretch mt-[1rem] gap-[1.5rem]">
        {routinesList.map((routine, index) => <RoutineCard key={index} exercises={routine.exercises} label={routine.routine_name} timeAgo='Last time: 4 years ago.'/>) }
      </div>
    </>
  )
}