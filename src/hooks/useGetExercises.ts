import { useState, useEffect, useMemo } from 'react'
import completeExercises from '../data/exercises.json'

type Exercise = { exercise_name: string; muscle_type: string; sub_muscle: string[]; techniques: string[]; img: string; video: string; unilateral: boolean; }

export default function useGetExercises(exercisesList: string[]) {

    const [filteredExercises, setFilteredExercises] = useState([])
    
    const stableExercisesList = useMemo(() => exercisesList, [JSON.stringify(exercisesList)])

    useEffect(() => {
        const exercisesSet = new Set(stableExercisesList)
        const filteredList = completeExercises.filter(({exercise_name}) => exercisesSet.has(exercise_name))
        setFilteredExercises(filteredList)
    }, [stableExercisesList])

    return filteredExercises
}

