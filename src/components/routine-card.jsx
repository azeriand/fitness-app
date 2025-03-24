import './routine-card.css'
import Button from './common/button'
import Badge from './common/badge'
import Card from './common/card'
import Timeline from './common/timeline'
import TlListItem from './common/timeline-list-item'
import { FaPlay } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function RoutineCard({exercises, label, timeAgo, ...cardProps}){
    return (
        <Card noBlur noPadding {...cardProps}>
            <div className='rc-card'>
                <div className='routine-card'>
                    <div className='rc-description'>
                        <div className='rc-label'>{label}</div>
                        <div className='rc-timeago'>{timeAgo}</div>
                    </div>

                    <div>
                        <Button appearance='ghost' label='Edit' icon={<MdEdit/>} position='right'/>
                        <Button appearance='mate' dark={false} label='Start' icon={<FaPlay/>} position='right'/>
                    </div>
                </div>
                <div className='routine-card-ul'>
                    <Timeline>
                        {
                            exercises.map((exercise, index) => (
                                <TlListItem key={index} label={exercise.name} badge={<Badge label={exercise.type}/>}/>
                            ))
                        }
                    </Timeline>
                </div>
            </div>
        </Card>
    );
}