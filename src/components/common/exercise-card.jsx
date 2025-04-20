import './exercise-card.css'
import Goku from '../../assets/goku2.jpg'
import Card from './card'
import Avatar from './avatar'
import Input from './input'
import Badge from './badge'

export default function ExerciseCard({exercises, label, badge, sets, ...cardProps}){

    return(
        <>
            <div className='flex width-100'>
                <Avatar size='3' rounded='s' src={Goku}/>
                <div className='width-100'>
                    <p>{label}</p>
                    {badge}
                </div>
            </div> 
            <Input style={{...cardProps.style}} maxLength='7' rounded='s' value= {sets} disabled/>

        </>
    )
}