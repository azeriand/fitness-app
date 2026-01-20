import './routine-history.css'
import { Card, Input, Button, Avatar, SectionName } from 'azeriand-library';
import ColorBadge from './color-badge';
import ExerciseCard from './exercise-card'
import Goku from '../assets/goku2.jpg'
import dayjs from 'dayjs'
import { FaDumbbell } from 'react-icons/fa'
import { IoTimerOutline } from "react-icons/io5";
import { useState, useEffect, useContext } from 'react'
import { SettingsContext } from './settings-context';


export default function RoutineHistory({routine, className}){

    const { defaultWeightUnit, calculateToIbs } = useContext(SettingsContext);
    const [cardExpanded, setCardExpanded] = useState(false);

    const onButtonClicked = () => {
        setCardExpanded(!cardExpanded);
    }
    
    const limitCollapsedExercises = 3
    const buttonTextCollapsed = 'See ' + (routine.exercises.length - limitCollapsedExercises) + ' more exercises'
    const buttonTextExpanded = 'See less'
    const [collapsedButtonText, setCollapsedButtonText] = useState(buttonTextCollapsed)

    const [collapsedExercises, setCollapsedExercises] = useState(routine.exercises.slice(0, 3))

    function formatTime(time) {
        let hours = Math.floor(time/3600)
        let minutes = Math.floor((time%3600)/60)
        let seconds = (time%3600)%60

        const format = (time) => time<10 ? `0${time}` : `${time}`
        const timeFormat = (`${format(hours)}:${format(minutes)}:${format(seconds)}`)
        
        return timeFormat
    }

    useEffect(() => {
       setCollapsedExercises(routine.exercises.slice(0, cardExpanded ? routine.exercises.length : 3))
       setCollapsedButtonText(cardExpanded ? buttonTextExpanded : buttonTextCollapsed)
    }, [cardExpanded])


    return(
        <Card intensity={500} noBlur color='zinc' className={'rounded-xl ' + className}>
            <div>
                <div className='md:flex items-center justify-between'>
                    <div className='flex items-center gap-x-[1rem]'>
                        <Avatar src={Goku} className='rounded-md'/>
                        <div className='aside-avatar'>
                            <p className='p-0 m-0 text-start text-purple-100'>{routine.user}</p>
                            <p className='p-0 m-0 text-start text-[0.75rem] text-zinc-400'>{dayjs(routine.day).format('dddd')}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-start md:!justify-end gap-x-2 mt-[1rem] md:!mt-0'>
                        <Input className='rounded-sm w-34' centerText value={formatTime(routine.duration)} icon={<IoTimerOutline/>} disabled/>
                        <Input className='rounded-sm w-34' centerText value={calculateToIbs(routine.volume) + ` ${defaultWeightUnit}`} icon={<FaDumbbell/>} disabled/>
                    </div>
                </div>

                <div className='flex items-center gap-x-[1rem] py-[1rem]'>
                    <p className='font-bold text-[1.5rem] text-purple-100'>{routine.name}</p>
                    <ColorBadge label={routine.type}/>
                </div>

                <div className='grid grid-cols-12 gap-y-[0.5rem] gap-x-[1rem] mb-[1rem]'>
                    <SectionName section='exercise' className='col-span-10 text-purple-200'/>   
                    <SectionName section='sets' className='col-span-2 text-purple-200 justify-self-center'/>

                    {
                        collapsedExercises.map((exercise, index) => (
                            <ExerciseCard key={index} label={exercise.exercise_name} sets={exercise.sets.length} badges={[<ColorBadge label={exercise.muscle_type}/>, exercise.sub_muscle.map(sub => <ColorBadge key={sub} label={sub}/>)]} img={exercise.img}/> 
                        ))
                    }
                    
                </div>
                <Button intensity={800} color='zinc' label={collapsedButtonText} onClick={onButtonClicked} className='w-full py-[3rem] !text-purple-100'/>
            </div>
        </Card>
    )
}