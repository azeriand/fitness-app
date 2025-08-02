import { PieChart } from '@mui/x-charts/PieChart';
import Card from '../components/common/card'
import Button from '../components/common/button'
import SectionName from './common/section-name'
import { useContext, useEffect, useState } from 'react'
import { ExerciseContext } from './exercise-context'

export default function PerMuscleGroupCard() {

    const {exercises, history} = useContext(ExerciseContext)
    let muscleTypes = [...new Set(exercises.map((exercise) => exercise.muscle_type))]
    let exercisesNames = [...new Set(exercises.map((exercise) => exercise.exercise_name))]
    const [muscleData, setMuscleData] = useState([])
    const [exerciseData, setExerciseData] = useState([])

    function getMuscleData(){
        muscleTypes.forEach((muscle, i) =>{
            let volume = 0;
            let count = 0;
            history.forEach((day) => {
                day.exercises.forEach((exercise) =>{
                    if(exercise.muscle_type === muscle){
                        exercise.sets.forEach((set) => {
                            volume = volume + set.weight * set.reps
                        })
                    }
                })

                if(day.exercises.findIndex((exercise) => exercise.muscle_type === muscle) !== -1){
                    count++
                }
                
            })
            setMuscleData((prevMuscleData) => [...prevMuscleData, {label: muscle, value: count, id: i}])
        })
    }

    function getExerciseData(){
        exercisesNames.forEach((exerciseName) => {
            let volume = 0;
            let count = 0;
            history.forEach((day) => {
                day.exercises.forEach((exercise) => {
                    if(exercise.exercise_name === exerciseName){
                        exercise.sets.forEach((set) => {
                            volume = volume + set.weight * set.reps
                        })
                    }
                })

                if(day.exercises.findIndex((exercise) => exercise.exercise_name === exerciseName) !== -1){
                    count++
                }
            })
            setExerciseData((prevExerciseData) => [...prevExerciseData, {label: exerciseName, value: volume, timesDone: count}])
            
        })
    }
    
    console.log('muscleData', muscleData, 'exerciseData', exerciseData, exercisesNames)
    console.log(exercises)
    useEffect(getMuscleData, [])
    useEffect(getExerciseData, [])

    function chartElementsShowed(number){
        let reducedMuscleData = muscleData.slice(0, number)
        let otherExercises = muscleData.slice(number, muscleData.lenght)
        let value = 0
        otherExercises.forEach((exercise) => value = value + exercise.value)
        let others = {label: 'Others', value: value, id: muscleData.length + 1}
        let chartData = [...reducedMuscleData, others]

        return chartData
    }

    console.log(chartElementsShowed(5))

    return(
        <Card noPadding appearance='ghost'>
            <SectionName section='per muscle group' className='pb-[0.5rem] tracking-normal'/>
            <Card noPadding className='p-[1rem] rounded-xl'>
                <div className='grid grid-cols-3 justify-start gap-[0.5rem] text-wrap'>
                    <Button appearance='mate' label='VOLUME' className='w-full rounded-lg'/>
                    <Button appearance='mate' label='TIME' className='w-full rounded-lg'/>
                </div>
                <PieChart
                    series={[
                        {
                        data: chartElementsShowed(6),
                        },
                    ]}
                    width={200}
                    height={200}
                />
            </Card>
        </Card>
    )
}