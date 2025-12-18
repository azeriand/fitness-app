import { Card, Button } from 'azeriand-library'
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrainingContext } from './training-context'
import { usePopup } from './popup-context'

export default function PlayPause(){

    const { switchTimer, resetTimer, trainingData } = useContext(TrainingContext)
    const { setIsPopupOpen } = usePopup()
    const navigate = useNavigate()

    const discard = () => {
        switchTimer()
        setIsPopupOpen(true)
    }

    const renderIcon = () => {
        if (trainingData.state === 'RUNNING') return <FaPause/>
        else {return <FaPlay/>}
    }

    return(
        <Card noPadding appearance='ghost' className='flex items-center'>
            <Button icon={renderIcon()} appearance='ghost' onClick={switchTimer}/>
            <Button icon={<FaStop/>} appearance='mate' onClick={discard}/>
        </Card>
    )
}