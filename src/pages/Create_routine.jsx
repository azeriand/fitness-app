
import SectionName from '../components/common/section-name'
import Card from '../components/common/card'
import Button from '../components/common/button'
import Input from '../components/common/input'
import AddExercise from '../components/add-exercise'
import SetsWidget from '../components/sets-widget'
import RowSet from '../components/common/row-set'
import { useContext, useEffect } from 'react'
import { TrainingContext } from '../components/common/training-context'

export default function CreateRoutine(){
    const {trainingData, startTraining, switchTimer, exercises} = useContext(TrainingContext)

    function getExercise(exerciseName){
        return exercises.find((exercise) => exercise.exercise_name === exerciseName)
    }

    return(
        <>
            <p className='text-start text-[2rem] font-bold m-0'>Create Routine</p>
            

            <div className='grid grid-cols-[70%_30%] gap-[1rem]'>
                <Card noPadding appearance='ghost'>
                    <div className='flex justify-start gap-[1rem] my-[2rem]'>
                         <Input type='text'size='60' placeholder='New routine'/>
                         <Button label='Save Routine' color='green'/>
                    </div>
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