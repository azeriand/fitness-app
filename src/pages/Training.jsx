
import SectionName from '../components/common/section-name'
import SetsWidget from '../components/sets-widget'
import RowSet from '../components/common/row-set'
import Button from '../components/common/button'
import TimeController from '../components/common/time-controller'
import AddExercise from '../components/add-exercise'

export default function Training(){
    return(
        <>
            <p className='text-start text-[2rem] font-bold m-0'>Workout Started</p>
            <div className='flex justify-between'>
                <TimeController/>
                <div className='flex'>
                    <Button label='View Routine'/>
                    <Button label='Finish Routine' color='green'/>
                    <Button label='Discard Routine' color='red'/>
                </div>
            </div>
            <SectionName section='Exercises'/>

            <AddExercise/>
        </>
    )
}