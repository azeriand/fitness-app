import { Card, Button, Input, SectionName } from 'azeriand-library'
import AddExercise from '../components/add-exercise'
import SetsWidget from '../components/sets-widget'
import RowSet from '../components/row-set'
import { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { TrainingContext } from '../components/training-context'
import useDraggable from '../hooks/useDraggable'
import { useSearchParams } from "react-router";
import { useMediaQuery } from 'react-responsive'
import { getCurrentDateTime } from '../utils/datetime.js'

export default function CreateRoutine(){

    const isMobile = useMediaQuery({ query: '(max-width: 48rem)' });
    const [exercisePickerHidden, setExercisePickerHidden] = useState(false);

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
        <div className='overflow-x-hidden w-full'>
            <Helmet>
                <title>Edit Routine | Fitness App</title>
            </Helmet>
            <div className={exercisePickerHidden ? '!hidden' : ''}>
                <div className='flex justify-between items-center'>
                    <p className='text-start text-[2rem] font-bold text-purple-200 m-0'>Create Routine</p>
                    <Button label='Save Routine' color='green' className='md:!hidden'/>
                </div>
                
                <div onDrop={onDrop} className='flex md:!grid md:!grid-cols-12 gap-[1rem] pb-32 md:pb-0 overflow-x-visible w-full'>
                    <Card noPadding appearance='ghost' className='w-full md:col-span-7'>
                        <div className='grid md:!grid-cols-[75%_25%] w-full justify-between items-center gap-[0.5rem] mt-[1rem] mb-[2rem] md:!my-[2rem] p-[0.5rem]'>
                            <Input onChange={updateRoutineName} value={routine.routine_name} type='text' placeholder='New routine' className='font-semibold w-full'/>
                            <Button label='Save Routine' color='green' className={isMobile? '!hidden' : 'w-full'}/>
                        </div>
                        <SectionName section='Exercises' className={isMobile? '!hidden' : 'mb-[1rem]'}/>
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

                        <Button label='Add Exercise' className='w-full md:!hidden' onClick={() => setExercisePickerHidden('!hidden')}/>
                    </Card>
                    <Card noPadding appearance='ghost' className={`md:col-span-5 ${isMobile ? '!hidden' : 'w-full'}`}>
                        <AddExercise onExerciseAdded={addExercise}/>
                    </Card>
                </div>
            </div>
            <Card noPadding appearance='ghost' className={!exercisePickerHidden ? '!hidden' : ''}>
                <AddExercise onExerciseAdded={addExercise} changeHiddenState={() => setExercisePickerHidden(!exercisePickerHidden)}/>
            </Card>
        </div>
    )
}