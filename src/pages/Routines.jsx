
import RoutineCard from "../components/routine-card"
import { SectionName } from 'azeriand-library'
import { useContext } from "react"
import { Helmet } from "react-helmet"
import { TrainingContext } from "../components/training-context"

export default function Train(){

  const { routinesList } = useContext(TrainingContext)

  return(
    <>
      <Helmet>
        <title>Routines | Fitness App</title>
      </Helmet>
      <p className='text-start text-[2rem] font-bold text-purple-100 m-0'>Train</p>
      <SectionName section='Routines'/>
      <div className="grid grid-cols-3 auto-rows-fr justify-stretch mt-[1rem] gap-[1.5rem]">
        {routinesList.map((routine, index) => <RoutineCard key={index} exercises={routine.exercises} label={routine.routine_name} timeAgo='Last time: 4 years ago.'/>) }
      </div>
    </>
  )
}