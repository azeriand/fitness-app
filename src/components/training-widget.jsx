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

export default function TrainingWidget(){
    return(
        <Card>
            <div className='firstrow'>
                <div className='current-time'>12:26</div>
                <div className='play-stop'>
                    <Button icon={<FaPause/>} appearance='ghost'/>
                    <Button icon={<FaStop/>} color='mate'/>
                </div>

            </div>
            <div className='secondrow'>
                <Timeline>
                    <TlListItem label='Bench Press'/>
                </Timeline>
                <div className='input-display'>
                    <Button icon={<FaChevronLeft/>} appearance='mate'/>
                    <Input rounded='md' maxLength='3'/>
                    <Input rounded='md' maxLength='3'/>
                    <Button icon={<FaChevronRight/>} appearance='mate'/>
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