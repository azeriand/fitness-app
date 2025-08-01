import Card from './common/card'
import Avatar from './common/avatar'
import Input from './common/input'

export default function ExerciseCard({label, badge, sets, img, ...cardProps}){
    const inputClassNames = 'rounded-sm w-20 h-[2.5rem] text-base box-border p-0 text-center font-bold'
    return(
        <>
            <Card className='flex items-center gap-x-[1rem] w-full p-2' noPadding {...cardProps}>
                <Avatar src={img} className='rounded-sm'/>
                <div className='w-full'>
                    <p className='m-0 p-0 text-start'>{label}</p>
                    {badge}
                </div>
            </Card> 
            {
                sets && <Input centerText className={inputClassNames} style={cardProps.style} maxLength='7' value={sets} disabled/>
            }

        </>
    )
}