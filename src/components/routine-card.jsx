import './routine-card.css'
import Button from './common/button'
import Badge from './common/badge'
import Card from './common/card'
import Timeline from './common/timeline'
import TlListItem from './common/timeline-list-item'
import { FaPlay } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function RoutineCard({exercises}){
    return (
        <Card fitWidth>
            <div>
                <p>Chest</p>
                <div>
                    <Button appearance='ghost' label='Edit' icon={<MdEdit/>} position='right'/>
                    <Button appearance='mate' label='Start' icon={<FaPlay/>} position='right'/>
                </div>
            </div>
            <Timeline>
                {
                    exercises.map((exercise) => (
                        <TlListItem label={exercise.name} badge={<Badge label={exercise.type}/>}/>
                        
                    ))
                }
            </Timeline>
        </Card>
    );
}