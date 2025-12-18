import { Card, Button, Timeline, TlListItem } from 'azeriand-library'
import Logo from '../components/logo'
import { useContext, useState } from 'react'
import { Helmet } from 'react-helmet';
import { TrainingContext } from '../components/training-context'
import { SettingsContext } from '../components/settings-context'
import { TiArrowForward } from "react-icons/ti";
import { FaWeightHanging } from "react-icons/fa6";
import { TbStopwatch } from "react-icons/tb";


export default function Finished_training(){

    const { defaultWeightUnit, calculateToIbs } = useContext(SettingsContext);
    const {trainingData} = useContext(TrainingContext)
    const [isTextShared, setTextShared] = useState(false)
    const [timeoutId, setTimeoutId] = useState();
 
    return(
        <Card className='grid grid-cols-[4fr] gap-y-[1rem] items-center justify-self-center self-center' appearance='ghost'>
            <Helmet>
                <title>Finished Training | Fitness App</title>
            </Helmet>
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
                            <p> 3200 {defaultWeightUnit}</p>
                        </Card>
                    </div>
                </div>
            </Card>
            <div className='grid grid-cols-1 gap-y-[0.5rem]'>
                <Button position='right' icon={isTextShared ? null : <TiArrowForward/>} appearance='outlined' className='rounded-3xl items-center px-[2rem] w-full h-[3rem]' 
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
                <Button appearance='mate' className='rounded-xl w-full h-[3rem]' label='New Training'/>  
            </div>
        </Card>
    )
}