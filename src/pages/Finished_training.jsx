import { Card } from 'azeriand-library'
import { Button } from 'azeriand-library'
import TlListItem from '../components/common/timeline-list-item'
import Timeline from '../components/common/timeline'
import Logo from '../components/logo'
import { useContext, useEffect, useState } from 'react'
import { TrainingContext } from '../components/training-context'
import { TiArrowForward } from "react-icons/ti";
import { FaWeightHanging } from "react-icons/fa6";
import { TbStopwatch } from "react-icons/tb";


export default function Finished_training(){

    const {trainingData} = useContext(TrainingContext)
    const [isTextShared, setTextShared] = useState(false)
    const [timeoutId, setTimeoutId] = useState();
 
    return(
        <Card className='grid w-[40%] gap-y-[1rem] items-center justify-self-center self-center'>
            <p className='text-7xl'>🎉</p>
            <p className='font-bold text-2xl'>Well done!</p>
            <Card color='purple' noPadding>
                <Logo/>
                <div className='flex justify-between items-center gap-x-[1rem] px-[1.5rem] pb-[1.5rem]'>
                    <Timeline>
                        {
                            trainingData.exercises.map((exercise, key) =>
                            <TlListItem label={exercise.exercise_name} key={exercise.exercise_name}/>)
                        }
                    </Timeline>
                    <div>
                        <Card noPadding appearance='outlined' className='items-center justify-items-center py-[1.25rem] px-[1rem] rounded-xl mb-[1rem]'>
                            <TbStopwatch/>
                            <p>32</p>
                        </Card>
                        <Card noPadding appearance='outlined' className='items-center justify-items-center py-[1.25rem] px-[1rem] rounded-xl'>
                            <FaWeightHanging/>
                            <p>3200kg</p>
                        </Card>
                    </div>
                </div>
            </Card>
            <div className='flex grid gap-y-[0.5rem]'>
                <Button noPadding position='right' icon={isTextShared ? null : <TiArrowForward/>} appearance='mate' className='rounded-3xl items-center px-[2rem]' 
                    onClick={() => {
                        
                        clearTimeout(timeoutId)
                        let copyExercises = []
                        trainingData.exercises.map((exercise) => copyExercises.push(exercise.exercise_name))
                        const exercisesList = copyExercises.join(', ')
                        navigator.clipboard.writeText(`The exercises executed are: ${exercisesList}`)
                        setTextShared(true);
                        setTimeoutId(setTimeout(() => {setTextShared(false)}, 3000))
                    }}>
                    {isTextShared ? 'Link Copied to clipboard!' : 'Share'}
                </Button>
                <Button noPadding appearance='mate' className='rounded-3xl'>New Training</Button>
            </div>
        </Card>
    )
}