import { Card, Button } from 'azeriand-library';

export default function PopupDiscardFinish({ onDiscard, onFinish, onCancel}) {
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