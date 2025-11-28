import { Card } from 'azeriand-library'
import { Avatar } from 'azeriand-library'
import { Input } from 'azeriand-library'

export default function ExerciseCard({label, badges, sets, img, ...cardProps}){
    const inputClassNames = 'rounded-sm w-[4rem] h-[2.5rem] text-base box-border p-0 text-center font-bold'
    return(
        <>
            <Card appearance='ghost' className='flex items-center gap-x-[1rem] w-full p-2 col-span-10' noPadding {...cardProps}>
                <Avatar src={img} className='rounded-sm'/>
                <div className='w-full'>
                    <p className='m-0 p-0 text-start'>{label}</p>
                    <div className='flex gap-x-1'>
                        {badges}
                    </div>
                </div>
            </Card>
            <div className='flex items-center col-span-2'>
                {
                    sets && <Input centerText className={inputClassNames} color='zinc' intensity={800} style={cardProps.style} maxLength='3' value={sets} disabled/>
                }
            </div> 

        </>
    )
}