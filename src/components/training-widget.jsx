import { useNavigate } from 'react-router-dom';
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { Button } from 'azeriand-library'
import { Card } from 'azeriand-library'
import { useContext } from 'react';
import { TrainingContext } from './training-context.jsx';
import { render } from 'react-dom';

export default function TrainingWidget({...cardProps}){

    const {timerformat, startTraining, stopTraining, switchTimer, resetTimer, trainingData} = useContext(TrainingContext);

    const navigate = useNavigate()
    const trainingWidgetProps = {
        padding: '0.5rem'
    }

    const inputClassNames = 'rounded-sm w-[2.5rem] h-[2.5rem] text-base box-border !px-0 text-center font-bold'

    const renderOptions = () => {

        const renderIcon = () => {
            if (trainingData.state === 'RUNNING') return <FaPause/>
            if (trainingData.state === 'PAUSED') return <FaPlay/>
            return <FaPlay/>
        }

        if (trainingData.state ==='STOPPED' || trainingData.state === null ){
            return (
                <Card noPadding noBlur className='m-[0.5rem]'>
                    <Button label='Start Training' icon={<FaPlay/>} position='right' className='w-full' onClick={()=> navigate('/routines')}/>
                </Card>            
            )
        }

        else if (trainingData.state === 'RUNNING' || trainingData.state === 'PAUSED'){
            return (
                <Card noBlur intensity={500} {...cardProps} style={{...cardProps.style, ...trainingWidgetProps}} className='flex items-center gap-x-[1rem] justify-between m-[0.5rem]'>
                    <div className='font-bold text-[1.5rem] w-fit'>{timerformat}</div>
                    <div className='flex items-center'>
                        <Button icon={renderIcon()} appearance='ghost' onClick={switchTimer}/>
                        <Button icon={<FaStop/>} appearance='mate' onClick={resetTimer}/>
                    </div>
                    <Button label='View More' className='w-full' onClick={()=> navigate('/training')}/>
                </Card>            
            )
        }

    }
    
    return renderOptions()
}