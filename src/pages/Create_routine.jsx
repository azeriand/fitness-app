import { SectionName } from 'azeriand-library'
import { Card } from 'azeriand-library'
import { Button } from 'azeriand-library'
import { Input } from 'azeriand-library'
import AddExercise from '../components/add-exercise'
import SetsWidget from '../components/sets-widget'
import RowSet from '../components/row-set'
import { useContext, useEffect, useState } from 'react'
import { TrainingContext } from '../components/training-context'
import useDraggable from '../hooks/useDraggable'
import { useSearchParams } from "react-router";
import { getCurrentDateTime } from '../utils/datetime.js'

export default function CreateRoutine(){

    
    const [routine, setRoutine] = useState({
        routine_name: '',
        created_day: getCurrentDateTime(),
        exercises: []
    })
    const { isDraggingUp, isDraggingDown, onDragStart, onDragOver, onDrop, draggedCardIndex } = useDraggable([routine, setRoutine]);
    const {getRoutineByName, exercises} = useContext(TrainingContext)
    const [searchParams] = useSearchParams();

    function getExercise(exerciseName){
        return routine.exercises.find((exercise) => exercise.exercise_name === exerciseName)
    }

    function addExercise(exerciseNameAdded) {
        const fullExercise = exercises.find(({exercise_name}) => exercise_name === exerciseNameAdded)
        setRoutine(oldRoutine => ({
            ...oldRoutine,
            exercises: [...oldRoutine.exercises, {...fullExercise, sets: [{ KG: 0, reps: 0 }], technique: fullExercise.techniques[0]}]
        }))
    }

    function addSet(exerciseName) {
        setRoutine(oldRoutine => {

            const exerciseIndex = oldRoutine.exercises.findIndex((exercise) => exercise.exercise_name === exerciseName)

            oldRoutine.exercises[exerciseIndex].sets.push({ KG: 0, reps: 0 })

            return {...oldRoutine}
        })
    }

    function updateRoutineName(value) {
        console.log(value)
        setRoutine((oldRoutine) => ({...oldRoutine, routine_name: value}))
    }

    useEffect(() => {
        const routineQueryName = searchParams.get('name');

        if (routineQueryName) {
            const foundRoutine = getRoutineByName(searchParams.get('name'));

            if (foundRoutine) {
                setRoutine(foundRoutine);
            }
        }
    }, [])

    return(
        <>
            <p className='text-start text-[2rem] font-bold m-0'>Create Routine</p>
            

            <div onDrop={onDrop} className='grid grid-cols-[70%_30%] gap-[1rem]'>
                <Card noPadding appearance='ghost'>
                    <div className='grid grid-cols-[75%_25%] w-full justify-center gap-x-[1rem] my-[2rem]'>
                        <Input onChange={updateRoutineName} value={routine.routine_name} type='text'size='60' placeholder='New routine' className='font-semibold'/>
                        <Button label='Save Routine' color='green'/>
                    </div>
                    <SectionName section='Exercises' className='mb-[1rem]'/>
                    <div className='flex flex-col gap-y-[1rem] mb-[1rem]'>
                        {
                            routine.exercises.map((routine, index) => {
                                const foundExercise = exercises.find(({exercise_name}) => exercise_name === routine.exercise_name)

                                const newExercise = {
                                    ...foundExercise,
                                    ...routine
                                }

                                if (!newExercise) return null;
                                return (
                                    <div key={newExercise.exercise_name}>
                                        <div className={`bg-white h-[3px] w-full mb-[0.25rem] ${isDraggingUp(index) ? '' : 'hidden'}`}/>
                                        <div draggable='true' className={`${draggedCardIndex === index? 'opacity-25' : 'opacity-100'}`} onDragStart={() => onDragStart(index)} onDragOver={(e) => onDragOver(e, index)}>
                                            <SetsWidget exercise={newExercise} onAddSet={() => addSet(newExercise.exercise_name)}>
                                                {newExercise.sets.map((set, index) => <RowSet key={`${set}-${index}`} num={index +1} reps={set.reps} kg={set.KG}/>)}
                                            </SetsWidget>

                                        </div>
                                        <div className={`bg-white h-[3px] w-full mt-[0.25rem] ${isDraggingDown(index) ? '' : 'hidden'}`}/>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <Button label='Add Exercise' className='w-full'/>
                </Card>
                <Card noPadding appearance='ghost'>
                    <AddExercise onExerciseAdded={addExercise}/>
                </Card>
            </div>
        </>
    )
}