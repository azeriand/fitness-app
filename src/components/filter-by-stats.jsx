import Card from './common/card'
import Input from './common/input';
import Badge from './common/badge'
import SectionName from './common/section-name';
import { useState, useContext } from 'react'
import { TrainingContext } from './common/training-context';
import { ExerciseContext } from './exercise-context';
import { IoMdSearch } from "react-icons/io";
import ExerciseCard from './exercise-card'

export default function FilterByStats(){

    const {exercises, searchValue, setSearchValue} = useContext(ExerciseContext)
    const [exerciseSelected, setExerciseSelected] = useState()
    const [badgeSelected, setBadgeSelected] = useState()
    

    function inputUpdated(value){
        setSearchValue(value)
    }

    const formatString = (str) => {
        return str.toLowerCase().replace(/[^A-Z0-9]/ig, "")
    }


    const customScrollbar = "overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"

    let muscleTypes = [...new Set(exercises.map((exercise) => exercise.muscle_type))]
    return(

        <Card noPadding className={`h-full overflow-y-scroll p-[1rem] rounded-lg ${customScrollbar}`}>
            <SectionName section='filter by'/>
            <Input type='search' iconPosition='right' value={searchValue} placeholder='Search Exercise' icon={<IoMdSearch/>} onChange={inputUpdated} className='w-full'/>
            <SectionName section='muscle groups' className='pt-[1rem]'/>
            <div className='flex flex-wrap gap-[0.5rem] py-[1rem]'>
                {
                    muscleTypes.map((type) => 
                                <Badge label={type} onClick={() => {setBadgeSelected(type)}} appearance={badgeSelected === type ? 'mate' : ''}/>)
                }
            </div>

            <SectionName section='exercises'/>
            {
                exercises.filter((exercise) => formatString(exercise.exercise_name).includes(formatString(searchValue)) || formatString(exercise.muscle_type).includes(formatString(searchValue)))
                        .map((exercise) => 
                        <div className='p-[0.5rem]' key={exercise.exercise_name}>
                            <ExerciseCard label={exercise.exercise_name} badge={<Badge label={exercise.muscle_type}/>} img={exercise.img} 
                            onClick ={() => {
                                setExerciseSelected(exercise.exercise_name)
                                setSearchValue(exercise.exercise_name)
                                }} appearance={exerciseSelected === exercise.exercise_name ? 'mate' : ''}/>
                        </div>)
            }

        </Card>

    )
}