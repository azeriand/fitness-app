import './training.css'
import SectionName from '../components/common/section-name'
import SetsWidget from '../components/sets-widget'
import RowSet from '../components/common/row-set'
import Button from '../components/common/button'
import TimeController from '../components/common/time-controller'

export default function Training(){
    return(
        <>
            <p className='page-name'>Workout Started</p>
            <div className='display-flex between'>
                <TimeController/>
                <div className='display-flex'>
                    <Button label='View Routine'/>
                    <Button label='Finish Routine' color='green'/>
                    <Button label='Discard Routine' color='red'/>
                </div>
            </div>
            <SectionName section='Exercises'/>
            <SetsWidget>
                <RowSet/>
                <RowSet/>
            </SetsWidget>
        </>
    )
}