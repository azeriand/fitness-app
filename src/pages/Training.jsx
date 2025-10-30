import { Card, Button, SectionName } from 'azeriand-library'
import TimeController from '../components/time-controller'
import AddExercise from '../components/add-exercise'
import SetsWidget from '../components/sets-widget'
import RowSet from '../components/row-set'
import { useContext, useEffect, useState } from 'react'
import useDraggable from '../hooks/useDraggable'
import { useNavigate } from 'react-router-dom';
import { TrainingContext } from '../components/training-context'

export default function Training(){
  
    const { trainingData, setTrainingData, updateReps, addExercise, addSet, updateKg, startTraining, resetTimer, exercises } = useContext(TrainingContext)
    const { isDraggingUp, isDraggingDown, onDragStart, onDragOver, onDrop, draggedCardIndex } = useDraggable([trainingData, setTrainingData]);
    const navigate = useNavigate();

    function getExercise(exerciseName){
        return exercises.find((exercise) => exercise.exercise_name === exerciseName)
    }

    function finish(){
        finishTraining()
        navigate('/finished-training')
        resetTimer()
    }

    useEffect(() => {
        if (trainingData.state === 'RUNNING') {
            startTraining()
        }
    }, [])

    const discard = () => {
        resetTimer()
        navigate('/routines')
    }
    

    return(
        <>
            <p className='text-start text-[2rem] font-bold m-0'>{trainingData.routine_name}</p>
            <div className='flex justify-between mt-[0.5rem]'>
                <TimeController cardAppearance='mate'/>
                <div className='flex gap-x-[0.5rem]'>
                    <Button label='View Routine' onClick={() => navigate('/edit-routine')}/>
                    <Button label='Finish Training' color='green' onClick={finish}/>
                    <Button label='Discard Training' color='red' onClick={discard}/>
                </div>
            </div>

            <div onDrop={onDrop} className='grid grid-cols-[70%_30%] gap-[1rem] mt-[2rem]'>
                <Card noPadding appearance='ghost'>
                    <SectionName section='Exercises' className='mb-[0.5rem]'/>
                    <div className='flex flex-col gap-[1rem]'>
                        {
                            trainingData.exercises.map((routine, index) => {
                                const exercise = {
                                    ...getExercise(routine.exercise_name),
                                    ...routine
                                }
                                if (!exercise) return null;
                                return (
                                    <>
                                    <div className={`bg-white h-[3px] w-full mb-[0.25rem] ${isDraggingUp(index) ? '' : 'hidden'}`}/>
                                    <div key={exercise.exercise_name} draggable='true' className={`${draggedCardIndex === index? 'opacity-25' : 'opacity-100'}`} onDragStart={() => onDragStart(index)} onDragOver={(e) => onDragOver(e, index)}>
                                        <SetsWidget exercise={exercise} key={exercise.exercise_name} onAddSet={() => addSet(exercise.exercise_name)}>
                                            {exercise.sets.map((set, index) => <RowSet key={`${set}-${index}`} num={index +1} reps={set.reps} kg={set.KG} onRepsChange={(value) => updateReps(exercise.exercise_name, index, value)} onKgChange={(value) => updateKg(exercise.exercise_name, index, value)}/>)}
                                        </SetsWidget>
                                    </div>
                                    <div className={`bg-white h-[3px] w-full mt-[0.25rem] ${isDraggingDown(index) ? '' : 'hidden'}`}/>
                                    </>
                            )})
                        }
                    </div>

                    <Card noPadding color='yellow' className='w-full mt-[1rem]'>
                        <p className='m-0 p-[1rem] text-center text-[1rem] font-bold'>Exercise can be picked from the right panel!</p>
                    </Card>
                </Card>
                <Card noPadding appearance='ghost'>
                    <AddExercise onExerciseAdded={addExercise}/>
                </Card>
            </div>
        </>
    )
}