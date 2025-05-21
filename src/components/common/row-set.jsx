
import Input from './input'
import Checkbox from './checkbox'

export default function RowSet({num, reps, kg}){
    return(
        <>
            <Input className='w-full' noPadding disabled placeholder={num}/>
            <Input className='w-full' noPadding disabled placeholder={`${reps} x ${kg} Kg`}/>
            <Input className='w-full' noPadding type='r'/>
            <Input className='w-full' noPadding type='number'/>
            <Checkbox/>
        </>
    )
}