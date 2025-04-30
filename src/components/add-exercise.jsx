import Card from './common/card'
import Button from './common/button'
import SectionName from './common/section-name'
import Input from './common/input'
import ExerciseCard from './exercise-card'
import Badge from './common/badge'
import { HiPlusSm } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { useContext, useState } from 'react'
import { TrainingContext } from '../components/common/training-context'

export default function AddExercise(){

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
            <Card appearance='ghost'>
                <SectionName section='add exercise'/>
                <Card>
                    <Input type='search' placeholder='Search exercises...' iconPosition='right' icon={<IoMdSearch/>} fullWidth onChange={inputUpdated} />
                    {
                        exercises.filter((exercise) => formatString(exercise.exercise_name).includes(formatString(searchbarValue)))
                                 .map((exercise) => 
                                    <div className='flex' key={exercise.exercise_name}>
                                        <Button appearance='ghost' icon={<HiPlusSm/>}/>
                                        <ExerciseCard label={exercise.exercise_name} badge={<Badge label={exercise.muscle_type}/>}></ExerciseCard>
                                    </div>
                                )
                    }
                </Card>
            </Card>
        </>
    )
}