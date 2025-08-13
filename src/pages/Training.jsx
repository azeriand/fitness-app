
import SectionName from '../components/common/section-name'
import { Card } from 'azeriand-library'
import { Button } from 'azeriand-library'
import TimeController from '../components/common/time-controller'
import AddExercise from '../components/add-exercise'
import SetsWidget from '../components/sets-widget'
import RowSet from '../components/common/row-set'
import { useContext, useEffect } from 'react'
import { TrainingContext } from '../components/common/training-context'

export default function Training(){
    const {trainingData, startTraining, switchTimer, exercises} = useContext(TrainingContext)

    function getExercise(exerciseName){
        return exercises.find((exercise) => exercise.exercise_name === exerciseName)
    }

    useEffect(() => {
        startTraining()
    }, [])

    return(
        <>
            <p className='text-start text-[2rem] font-bold m-0'>{trainingData.routine_name}</p>
            <div className='flex justify-between'>
                <TimeController/>
                <div className='flex'>
                    <Button label='View Routine'/>
                    <Button label='Finish Routine' color='green' onClick={switchTimer}/>
                    <Button label='Discard Routine' color='red' onClick={switchTimer}/>
                </div>
            </div>

            <div className='grid grid-cols-[70%_30%] gap-[1rem]'>
                <Card noPadding appearance='ghost'>
                    <SectionName section='Exercises'/>
                    {
                        trainingData.exercises.map((routine) => {
                            const exercise = {
                                ...getExercise(routine.exercise_name),
                                ...routine
                            }
                            if (!exercise) return null;
                            return (
                            <SetsWidget exercise={exercise}>
                                {exercise.sets.map((set, index) => <RowSet key={`${set}-${index}`} num={index +1} reps={set.reps} kg={set.KG}/>)}
                            </SetsWidget>
                        )})
                    }

                    <Button label='Add Exercise' className='w-full mt-[1rem]'/>
                </Card>
                <Card noPadding appearance='ghost'>
                    <AddExercise/>
                </Card>
            </div>
        </>
    )
}