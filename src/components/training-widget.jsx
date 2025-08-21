import { useNavigate } from 'react-router-dom';
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { Button } from 'azeriand-library'
import { Card } from 'azeriand-library'
import { useContext } from 'react';
import { TrainingContext } from './common/training-context.jsx';

export default function TrainingWidget({...cardProps}){

    const {timerformat, startTraining, stopTraining, switchTimer} = useContext(TrainingContext);

    const navigate = useNavigate()
    const trainingWidgetProps = {
        padding: '0.5rem'
    }

    const inputClassNames = 'rounded-sm w-[2.5rem] h-[2.5rem] text-base box-border !px-0 text-center font-bold'

    return(
        <>
            <Card noBlur intensity={500} {...cardProps} style={{...cardProps.style, ...trainingWidgetProps}} className='flex items-center gap-x-[1rem] justify-between m-[0.5rem]'>
                <div className='font-bold text-[1.5rem] w-fit'>{timerformat}</div>
                <div className='flex items-center'>
                    <Button icon={<FaPause/>} appearance='ghost' onClick={switchTimer}/>
                    <Button icon={<FaStop/>} appearance='mate' onClick={stopTraining}/>
                </div>
                <Button label='View More' className='w-full' onClick={()=> navigate('/training')}/>
            </Card>

            <Card noPadding noBlur className='m-[0.5rem]'>
                <Button label='Start Training' icon={<FaPlay/>} position='right' className='w-full' onClick={()=> navigate('/routines')}/>
            </Card>
        </>
    )
}