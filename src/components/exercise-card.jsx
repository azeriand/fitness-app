import Goku from '../assets/goku2.jpg'
import Avatar from './common/avatar'
import Input from './common/input'

export default function ExerciseCard({label, badge, sets, img, ...cardProps}){
    const inputClassNames = 'rounded-sm w-20 h-[2.5rem] text-base box-border p-0 text-center font-bold'
    return(
        <>
            <div className='flex items-center gap-x-[1rem] w-full'>
                <Avatar src={img} className='rounded-sm'/>
                <div className='w-full'>
                    <p className='m-0 p-0 text-start'>{label}</p>
                    {badge}
                </div>
            </div> 
            {
                sets && <Input centerText className={inputClassNames} style={cardProps.style} maxLength='7' value={sets} disabled/>
            }

        </>
    )
}