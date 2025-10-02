import { Card } from 'azeriand-library'
import { Input } from 'azeriand-library';
import { Badge } from 'azeriand-library'
import { SectionName } from 'azeriand-library';
import { useState, useContext } from 'react'
import { ExerciseContext } from './exercise-context';
import { IoMdSearch } from "react-icons/io";
import ExerciseCard from './exercise-card'

export default function FilterByStats(){

    const {exercises, searchValue, setSearchValue, filterSelected, setFilterSelected} = useContext(ExerciseContext)
    

    function inputUpdated(value){
        if (value === '') {
            setFilterSelected(null);
        }
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
                    muscleTypes.map((muscleGroup) => 
                                <Badge label={muscleGroup} onClick={() => {
                                    setFilterSelected({name: muscleGroup, type: 'muscle_group'})
                                    setSearchValue(muscleGroup)
                                }} appearance={filterSelected && filterSelected.name === muscleGroup ? 'mate' : 'ghost'}/>)
                }
            </div>

            <SectionName section='exercises'/>
            {
                exercises.filter((exercise) => formatString(exercise.exercise_name).includes(formatString(searchValue)) || formatString(exercise.muscle_type).includes(formatString(searchValue)))
                        .map((exercise) => 
                        <div className='p-[0.5rem]' key={exercise.exercise_name}>
                            <ExerciseCard label={exercise.exercise_name} badge={<Badge label={exercise.muscle_type}/>} img={exercise.img} 
                            onClick ={() => {
                                setFilterSelected({name: exercise.exercise_name, type: 'exercise'})
                                setSearchValue(exercise.exercise_name)
                                }} appearance={filterSelected && filterSelected.name === exercise.exercise_name ? 'mate' : ''}/>
                        </div>)
            }

        </Card>

    )
}