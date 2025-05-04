import Card from './common/card'
import Input from './common/input';
import Badge from './common/badge'
import SectionName from './common/section-name';
import { useState, useContext } from 'react'
import { TrainingContext } from './common/training-context';
import { IoMdSearch } from "react-icons/io";
import ExerciseCard from './exercise-card'

export default function FilterByStats(){

    const [searchValue, setSearchValue] = useState('')
    const {exercises} = useContext(TrainingContext)

    function inputUpdated(value){
        setSearchValue(value)
    }

    const formatString = (str) => {
        return str.toLowerCase().replace(/[^A-Z0-9]/ig, "")
    }

    const customScrollbar = "max-h-100 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"

    return(

        <Card noPadding className={`h-full overflow-y-scroll p-[1rem] ${customScrollbar}`}>
            <SectionName section='filter by'/>
            <Input type='search' iconPosition='right' placeholder='Search Exercise' icon={<IoMdSearch/>} onChange={inputUpdated} className='w-full'/>

            {
            exercises.filter((exercise) => formatString(exercise.exercise_name).includes(formatString(searchValue)))
                        .map((exercise) => 
                        <div className='p-[0.5rem]'>
                            <ExerciseCard label={exercise.exercise_name} badge={<Badge label={exercise.muscle_type}/>}/>
                        </div>)
            }

        </Card>

    )
}