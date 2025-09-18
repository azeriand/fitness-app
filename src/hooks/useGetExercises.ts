import { useState, useEffect } from 'react'
import completeExercises from '../data/exercises.json'

type Exercise = { exercise_name: string; muscle_type: string; sub_muscle: string[]; techniques: string[]; img: string; video: string; unilateral: boolean; }

export default function useGetExercises(exercisesList: string[]) {

    const [filteredExercises, setFilteredExercises] = useState([])
    const exercisesSet = new Set(exercisesList)

    useEffect(() => {
        const filteredList = completeExercises.filter(({exercise_name}) => exercisesSet.has(exercise_name))
        setFilteredExercises(filteredList)}, [exercisesList]
    )

    return filteredExercises
}

