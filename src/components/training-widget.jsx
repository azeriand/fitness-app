import { useNavigate } from 'react-router-dom';
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { Button } from 'azeriand-library'
import { Card } from 'azeriand-library'
import TimeController from './time-controller.jsx';
import { useContext } from 'react';
import { TrainingContext } from './training-context.jsx';

export default function TrainingWidget({...cardProps}){

    const { trainingData } = useContext(TrainingContext);

    const navigate = useNavigate()
    const trainingWidgetProps = {
        padding: '0.5rem'
    }

    const renderOptions = () => {

        if (trainingData.state ==='STOPPED' || trainingData.state === null ){
            return (
                <Card noPadding noBlur className='m-[0.5rem]'>
                    <Button label='Start Training' icon={<FaPlay/>} position='right' className='w-full' onClick={()=> navigate('/routines')}/>
                </Card>            
            )
        }

        else if (trainingData.state === 'RUNNING' || trainingData.state === 'PAUSED'){
            return (
                <Card noBlur noPadding intensity={500} {...cardProps} style={{...cardProps.style, ...trainingWidgetProps}} className='flex items-center gap-x-[0.5rem] justify-between m-[0.5rem]'>
                    <TimeController appearance='ghost'/>
                    <Button label='View More' className='w-full' onClick={()=> navigate('/training')}/>
                </Card>            
            )
        }

    }
    
    return renderOptions()
}