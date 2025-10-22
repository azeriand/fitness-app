import './routine-history.css'
import { Card } from 'azeriand-library'
import { Input } from 'azeriand-library'
import { Button } from 'azeriand-library'
import { Badge } from 'azeriand-library'
import { Avatar } from 'azeriand-library'
import { SectionName } from 'azeriand-library'
import ExerciseCard from './exercise-card'
import Goku from '../assets/goku2.jpg'
import dayjs from 'dayjs'
import {FaDumbbell} from 'react-icons/fa'
import { IoTimerOutline } from "react-icons/io5";
import { useState, useEffect } from 'react'


export default function RoutineHistory({routine}){

    const [cardExpanded, setCardExpanded] = useState(false);

    const onButtonClicked = () => {
        setCardExpanded(!cardExpanded);
    }
    
    const limitCollapsedExercises = 3
    const buttonTextCollapsed = 'See ' + (routine.exercises.length - limitCollapsedExercises) + ' more exercises'
    const buttonTextExpanded = 'See less'
    const [collapsedButtonText, setCollapsedButtonText] = useState(buttonTextCollapsed)

    const [collapsedExercises, setCollapsedExercises] = useState(routine.exercises.slice(0, 3))

    useEffect(() => {
       setCollapsedExercises(routine.exercises.slice(0, cardExpanded ? routine.exercises.length : 3))
       setCollapsedButtonText(cardExpanded ? buttonTextExpanded : buttonTextCollapsed)
    }, [cardExpanded])


    return(
        <Card>
            <div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-[1rem]'>
                        <Avatar src={Goku} className='rounded-md'/>
                        <div className='aside-avatar'>
                            <p className='p-0 m-0 text-start'>{routine.user}</p>
                            <p className='p-0 m-0 text-start text-[0.75rem] last-time'>{dayjs(routine.day).format('dddd')}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-x-2'>
                        <Input className='rounded-sm w-26' centerText value={routine.duration} icon={<IoTimerOutline/>} disabled/>
                        <Input className='rounded-sm w-26' centerText value={routine.volume} icon={<FaDumbbell/>} disabled/>
                    </div>
                </div>

                <div className='flex items-center gap-x-[1rem] py-[1rem]'>
                    <p className='font-bold text-[1.5rem]'>{routine.name}</p>
                    <Badge label={routine.type}/>
                </div>

                <div className='grid grid-cols-[80%_20%] gap-[1rem] mb-[1rem]'>
                    <SectionName section='exercise'/>   
                    <SectionName section='sets'/>

                    {
                        collapsedExercises.map((exercise, index) => (
                            <ExerciseCard key={index} label={exercise.exercise_name} sets={exercise.sets.length} badge={<Badge label={exercise.muscle_type}/>} img={exercise.img}/> 
                        ))
                    }
                    
                </div>
                <Button label={collapsedButtonText} onClick={onButtonClicked} className='w-full py-[3rem]'/>
            </div>
        </Card>
    )
}