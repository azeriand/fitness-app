import Goku from '../assets/goku2.jpg'
import Avatar from './common/avatar'
import Input from './common/input'

export default function ExerciseCard({label, badge, sets, ...cardProps}){
    const inputStyle = {
        width: '5rem',
        height: '2.5rem',
        fontSize: '1rem',
        boxSizing: 'border-box',
        padding: '0',
        textAlign: 'center',
        fontWeight: 'bold',
    }
    return(
        <>
            <div className='flex items-center gap-x-[1rem] w-full'>
                <Avatar src={Goku} className='rounded-sm'/>
                <div className='w-full'>
                    <p className='m-0 p-0 text-start'>{label}</p>
                    {badge}
                </div>
            </div> 
            {
                sets && <Input className='rounded-sm' style={{...cardProps.style, ...inputStyle}} maxLength='7' value={sets} disabled/>
            }

        </>
    )
}