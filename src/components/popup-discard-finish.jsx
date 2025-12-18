import { Card, Button } from 'azeriand-library';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TrainingContext } from './training-context';
import { usePopup } from './popup-context'

export default function PopupDiscardFinish({ onDiscard, onFinish, onCancel}) {

    const { resetTimer, switchTimer } = useContext(TrainingContext);
    const { setIsPopupOpen } = usePopup()
    const navigate = useNavigate();

    function onDiscard() {
        resetTimer();
        navigate('/routines');
        setIsPopupOpen(false)
    }

    function onFinish() {
        navigate('/finished-training');
        setIsPopupOpen(false)
    }

    function onCancel() {
        setIsPopupOpen(false)
        switchTimer()
    }

    return(
        <Card className='w-[90%] h-fit max-w-[25rem] p-6 flex flex-col gap-y-6' appearance='mate'>
            <p className='text-[1.25rem] font-semibold m-0'>Are you sure you want to discard this routine?</p>
            <div className='flex justify-center gap-x-4'>
                <Button label='Cancel' onClick={onCancel}/>
                <Button label='Discard' onClick={onDiscard}/>
                <Button label='Finish' onClick={onFinish}/>
            </div>
        </Card>
    )
}