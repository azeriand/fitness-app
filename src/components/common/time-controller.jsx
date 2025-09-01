
import { Card } from 'azeriand-library'
import { Button } from 'azeriand-library'
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { useContext } from 'react'
import { TrainingContext } from './training-context'

export default function TimeController(){
    
    const {timerformat, switchTimer, resetTimer} = useContext(TrainingContext)

    const discard = () => {
        switchTimer()
        window.location.href = '/routines'
    }

    return(
        <Card className='w-fit' noPadding>
            <div className='flex items-center justify-between p-[0.5rem] gap-x-[7rem]'>
                <div className='text-[1.5rem] font-bold'>{timerformat}</div>
                <div className='flex items-center'>
                    <Button icon={<FaPause/>} appearance='ghost' onClick={switchTimer}/>
                    <Button icon={<FaStop/>} appearance='mate' onClick={discard}/>
                </div>
            </div>
        </Card>
    )
}