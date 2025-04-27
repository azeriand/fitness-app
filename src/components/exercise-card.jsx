import './exercise-card.css'
import Goku from '../assets/goku2.jpg'
import Card from './common/card'
import Avatar from './common/avatar'
import Input from './common/input'
import Badge from './common/badge'

export default function ExerciseCard({exercises, label, badge, sets, ...cardProps}){

    return(
        <>
            <div className='flex items-center gap-x-[1rem] w-full'>
                <Avatar src={Goku} className='rounded-sm'/>
                <div className='w-full'>
                    <p className='m-0 p-0 text-start'>{label}</p>
                    {badge}
                </div>
            </div> 
            <Input className='rounded-sm' style={{...cardProps.style}} maxLength='7' value= {sets} disabled/>

        </>
    )
}