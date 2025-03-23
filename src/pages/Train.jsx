import './Train.css'
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
            <p className='page-name'>Train</p>
            <SectionName section='Trainings'/>
            <div className="train-routine-card">
                <RoutineCard exercises={exercises} label='Chest' timeAgo='Last time: 4 years ago.'/>
                <RoutineCard exercises={exercises} label='Chest' timeAgo='Last time: 4 years ago.'/>
                <RoutineCard exercises={exercises} label='Chest' timeAgo='Last time: 4 years ago.'/>
                <RoutineCard exercises={exercises} label='Chest' timeAgo='Last time: 4 years ago.'/>
            </div>
        </>
    )
}