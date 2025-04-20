import './training.css'
import SectionName from '../components/common/section-name'
import SetsWidget from '../components/sets-widget'
import RowSet from '../components/common/row-set'
import Button from '../components/common/button'

export default function Training(){
    return(
        <>
            <p className='page-name'>Workout Started</p>
            <div className='display-flex'>
                <Button label='View Routine'/>
                <Button label='Finish Routine' color='green'/>
                <Button label='Discard Routine' color='red'/>
            </div>
            <SectionName section='Exercises'/>
            <SetsWidget>
                <RowSet/>
                <RowSet/>
            </SetsWidget>
        </>
    )
}