import { useNavigate } from 'react-router-dom';
import './routine-card.css'
import Button from './common/button'
import Badge from './common/badge'
import Card from './common/card'
import Timeline from './common/timeline'
import TlListItem from './common/timeline-list-item'
import { FaPlay } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function RoutineCard({exercises, label, timeAgo, ...cardProps}){

    const navigate = useNavigate()
    const trainingWidgetStyle = {
        height: '4.5rem',
    }

    return (
        <Card noBlur noPadding {...cardProps}>
            <div className='p-[1.25rem]'>
                <div className='flex items-center gap-x-[1rem]'>
                    <div className='text-start'>
                        <div className='font-bold text-[1.5rem]'>{label}</div>
                        <div className='rc-timeago text-[0.75rem]'>{timeAgo}</div>
                    </div>

                    <div>
                        <Button appearance='ghost' label='Edit' icon={<MdEdit/>} position='right'/>
                        <Button appearance='mate' dark={false} label='Start' icon={<FaPlay/>} position='right' onClick={() => navigate('/training')}/>
                    </div>
                </div>
                <div className='routine-card-ul'>
                    <Timeline style={trainingWidgetStyle}>
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