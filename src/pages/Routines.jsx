
import RoutineCard from "../components/routine-card"
import SectionName from '../components/common/section-name'
import { Card } from "azeriand-library"
import { useContext, useEffect } from "react"
import { TrainingContext } from "../components/common/training-context"

export default function Train(){

  const { routinesList } = useContext(TrainingContext)

  return(
    <>
      <p className='text-start text-[2rem] font-bold m-0'>Train</p>
      <SectionName section='Routines'/>
      <div className="grid grid-cols-3 auto-rows-fr justify-stretch mt-[1rem] gap-[1.5rem]">
        {routinesList.map((routine, index) => <RoutineCard key={index} exercises={routine.exercises} label={routine.routine_name} timeAgo='Last time: 4 years ago.'/>) }
      </div>
    </>
  )
}