import { Card, Button, SectionName, Input, Badge } from 'azeriand-library'
import ExerciseCard from './exercise-card'
import { HiPlusSm } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { useContext, useState } from 'react'
import { TrainingContext } from '../components/training-context'

export default function AddExercise({ onExerciseAdded }){

    const {exercises} = useContext(TrainingContext)
    const [searchbarValue, setSearchbarValue] = useState('')

    function inputUpdated(value){
        setSearchbarValue(value)
    }

    const formatString = (str) => {
        return str.toLowerCase().replace(/[^A-Z0-9]/ig, "")
    }

    return(
        <>
            <Card noPadding appearance='ghost'>
                <SectionName section='add exercise' className='mb-[0.5rem]'/>
                <Card>
                    <Input type='search' placeholder='Search exercises...' iconPosition='right' icon={<IoMdSearch/>} onChange={inputUpdated} className='w-full mb-[1rem]' />
                    {
                        exercises.filter((filteredExercise) => formatString(filteredExercise.exercise_name).includes(formatString(searchbarValue)))
                                 .map((exercise) => 
                                    <div className='grid grid-cols-[20%_80%] gap-y-[1rem]' key={exercise.exercise_name}>
                                        <Button appearance='ghost' icon={<HiPlusSm/>} onClick={() => onExerciseAdded(exercise.exercise_name)} />
                                        <ExerciseCard appearance='ghost' label={exercise.exercise_name} badge={<Badge label={exercise.muscle_type}/>} img={exercise.img}></ExerciseCard>
                                    </div>
                                )
                    }
                </Card>
            </Card>
        </>
    )
}