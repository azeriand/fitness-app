import { Card, Button, SectionName, Input } from 'azeriand-library'
import ColorBadge from './color-badge';
import ExerciseCard from './exercise-card'
import { HiPlusSm } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { useContext, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { TrainingContext } from '../components/training-context'

export default function AddExercise({ onExerciseAdded, changeHiddenState }){

    const {exercises} = useContext(TrainingContext)
    const [searchbarValue, setSearchbarValue] = useState('')
    const isMobile = useMediaQuery({ query: '(max-width: 48rem)' });

    function inputUpdated(value){
        setSearchbarValue(value)
    }

    const formatString = (str) => {
        return str.toLowerCase().replace(/[^A-Z0-9]/ig, "")
    }

    return(
        <>
            <Card noPadding appearance='ghost' className='overflow-y-scroll h-full pb-32 md:pb-0'>
                <SectionName section='add exercise' className='mb-[0.5rem]'/>
                <Card>
                    <div className='flex items-center gap-[1rem] cursor-pointer mb-[1rem]'>
                        <Button icon={<FaArrowLeft/>} appearance='ghost' onClick={changeHiddenState} className='md:!hidden'/>
                        <Input type='search' placeholder='Search exercises...' iconPosition='right' icon={<IoMdSearch/>} onChange={inputUpdated} className='w-[23.5rem]' />
                    </div>
                    {
                        exercises.filter((filteredExercise) => formatString(filteredExercise.exercise_name).includes(formatString(searchbarValue)))
                                 .map((exercise) => 
                                    <div className='grid grid-cols-[20%_80%] gap-y-[1rem]' key={exercise.exercise_name}>
                                        <Button appearance='ghost' icon={<HiPlusSm/>} onClick={() => {
                                                onExerciseAdded(exercise.exercise_name)
                                                if (isMobile) {changeHiddenState()}
                                            }} />
                                        <ExerciseCard appearance='ghost' label={exercise.exercise_name} badge={<ColorBadge label={exercise.muscle_type}/>} img={exercise.img}></ExerciseCard>
                                    </div>
                                )
                    }
                </Card>
            </Card>
        </>
    )
}