import { useNavigate } from 'react-router-dom';
import useGetExercises from '../hooks/useGetExercises';
import { useContext } from 'react';
import { TrainingContext } from './common/training-context';
import './routine-card.css'
import { Button } from 'azeriand-library'
import { Badge } from 'azeriand-library'
import { Card } from 'azeriand-library'
import Timeline from './common/timeline'
import TlListItem from './common/timeline-list-item'
import { FaPlay } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { use } from 'react';

export default function RoutineCard({exercises, label, timeAgo, ...cardProps}){

    const exerciseList = useGetExercises(exercises.map((exercise, index) => exercise.exercise_name))
    const navigate = useNavigate()
    const { routinesList, setTrainingData } = useContext(TrainingContext)
    const trainingWidgetStyle = {
        height: '4.5rem',
    }

    const activeRoutine = routinesList.find((routine) => routine.routine_name === label)

    function handleStart(){
        navigate('/training')
        setTrainingData({...activeRoutine, state: 'RUNNING'})
    }

    return (
        <Card noBlur noPadding {...cardProps}>
            <div className='p-[1.25rem]'>
                <div className='flex items-center gap-x-[1rem]'>
                    <div className='text-start'>
                        <div className='font-bold text-[1.5rem]'>{label}</div>
                        <div className='rc-timeago text-[0.75rem]'>{timeAgo}</div>
                    </div>

                    <div>
                        <Button appearance='ghost' label='Edit' icon={<MdEdit/>} position='right'/>
                        <Button appearance='mate' dark={false} label='Start' icon={<FaPlay/>} position='right' onClick={() => {handleStart()}}/>
                    </div>
                </div>
                <div className='routine-card-ul'>
                    <Timeline style={trainingWidgetStyle}>
                        {
                            exerciseList.map((exercise, index) => (
                                <TlListItem key={index} label={exercise.exercise_name} badge={<Badge label={exercise.muscle_type}/>}/>
                            ))
                        }
                    </Timeline>
                </div>
            </div>
        </Card>

    );
}