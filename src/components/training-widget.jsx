import { useNavigate } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import { Button, GradientGlow } from 'azeriand-library'
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
                <Card noPadding noBlur className='m-[0.5rem] py-[0.5rem]' appearance='ghost' {...cardProps} style={{...cardProps.style, ...trainingWidgetProps}}>
                    <GradientGlow animation="pulse"
                                  animationType="hover"
                                  gradientTheme="purple-blue"
                                  duration={0.6}
                                  blurIntensity={15}
                                  glowSpread={8}
                                  opacity={0.9} 
                                  easing='ease-in-out'
                                  borderRadius="12px">
                        <Button appearance="mate" color='purple' intensity={900} label='Start Training' icon={<FaPlay/>} position='right' className='w-full' onClick={()=> navigate('/routines')}/>
                    </GradientGlow>
                </Card>            
            )
        }

        else if (trainingData.state === 'RUNNING' || trainingData.state === 'PAUSED'){
            return (
                <Card appearance='ghost' {...cardProps} style={{...cardProps.style, ...trainingWidgetProps}} className='flex items-center gap-x-[0.5rem] justify-between absolute bottom-4 m-[0.5rem]'>
                    <TimeController appearance='ghost'/>
                    <Button label='View More' className='w-full' onClick={()=> navigate('/training')}/>
                </Card>            
            )
        }

    }
    
    return renderOptions()
}