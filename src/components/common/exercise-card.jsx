import './exercise-card.css'
import Goku from '../../assets/goku2.jpg'
import Card from './card'
import Avatar from './avatar'
import Input from './input'
import Badge from './badge'

export default function ExerciseCard({exercises, label, badge, sets, ...cardProps}){

    return(
        <>
            <div className='flex items-center gap-x-[1rem] w-full'>
                <Avatar size='3' rounded='s' src={Goku}/>
                <div className='w-full'>
                    <p className='m-0 p-0 text-start'>{label}</p>
                    {badge}
                </div>
            </div> 
            <Input style={{...cardProps.style}} maxLength='7' rounded='s' value= {sets} disabled/>

        </>
    )
}