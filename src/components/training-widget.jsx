import './training-widget.css'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import Button from './common/button'
import Card from './common/card'
import Timeline from './common/timeline';
import TlListItem from './common/timeline-list-item'
import Input from './common/input'

export default function TrainingWidget({...cardProps}){
    const trainingWidgetProps = {
        padding: '0.5rem'
    }

    const inputProps ={
        height: '2rem',
        width: '2rem',
    }
    return(
        <Card noBlur intensity={500} {...cardProps} style={{...cardProps.style, ...trainingWidgetProps}}>
            <div className='firstrow'>
                <div className='current-time'>12:26</div>
                <div className='play-stop'>
                    <Button icon={<FaPause/>} appearance='ghost'/>
                    <Button icon={<FaStop/>} color='mate'/>
                </div>

            </div>
            <div className='secondrow'>
                <div className='exerciseName'>Bench Press</div>
                <div className='input-display'>
                    <Button icon={<FaChevronLeft/>} appearance='mate' size='sm'/>
                    <Input rounded='md' maxLength='3' style={{...cardProps.style, ...inputProps}}/>
                    <Input rounded='md' maxLength='3' style={{...cardProps.style, ...inputProps}}/>
                    <Button icon={<FaChevronRight/>} appearance='mate' size='sm'/>
                </div>
            </div>
            <div className='thirdrow'>
                <Button label='Open' fullWidth/>
                <Button label='Finish' color='green' intensity='600' fullWidth/>
                <Button label='Discard' color='red' intensity='600' fullWidth/>
            </div>
        </Card>
    )
}