import { Card, Button } from 'azeriand-library';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TrainingContext } from './training-context';
import { usePopup } from './popup-context'
import { ImCross } from "react-icons/im";

export default function PopupDiscardFinish({ onDiscard, onFinish, onCancel}) {

    const { resetTimer, switchTimer, pauseTraining, removeTraining, setTrainingData} = useContext(TrainingContext);
    const { setIsPopupOpen } = usePopup()
    const navigate = useNavigate();

    function onDiscard() {
        resetTimer();
        navigate('/routines');
        setIsPopupOpen(false)
    }

    function onFinish() {
        setIsPopupOpen(false)
        setTrainingData(({state, ...oldTrainingData}) => ({...oldTrainingData, state: 'STOPPED'}));
        navigate('/finished-training');
        pauseTraining();
        removeTraining();
    }

    function onCancel() {
        setIsPopupOpen(false)
        switchTimer()
    }

    return(
        <Card noPadding className='w-[90%] h-fit max-w-[25rem] p-[1rem]'>
            <Button icon={<ImCross/>} className='justify-self-end' onClick={onCancel}/>
            <div className='flex flex-col gap-y-6 px-6 pb-6 pt-2 items-center'>
                <p className='text-[1.25rem] font-semibold p-0'>
                    Would you like to save your progress or discard this session?</p>
                <div className='flex justify-center gap-x-4'>
                    <Button label='Discard' color='red' onClick={onDiscard}/>
                    <Button label='Finish' color='green' onClick={onFinish}/>
                </div>
            </div>
        </Card>
    )
}