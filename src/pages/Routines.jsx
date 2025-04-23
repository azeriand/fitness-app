import './Routines.css'
import RoutineCard from "../components/routine-card"
import SectionName from '../components/common/section-name'

export default function Train(){
    const exercises = [
        {
          name: "Hip Thrust",
          type: "Glutes"
        },
        {
          name: "Bench Press",
          type: "Chest"
        },
        {
          name: "Leg Extension",
          type: "Quads"
        },
    ]

    return(
        <>
            <p className='text-start text-[2rem] font-bold m-0'>Train</p>
            <SectionName section='Routines'/>
            <div className="train-routine-card">
                <RoutineCard exercises={exercises} label='Chest' timeAgo='Last time: 4 years ago.'/>
                <RoutineCard exercises={exercises} label='Chest' timeAgo='Last time: 4 years ago.'/>
                <RoutineCard exercises={exercises} label='Chest' timeAgo='Last time: 4 years ago.'/>
                <RoutineCard exercises={exercises} label='Chest' timeAgo='Last time: 4 years ago.'/>
            </div>
        </>
    )
}