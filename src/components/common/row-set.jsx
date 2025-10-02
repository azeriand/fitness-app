
import { Input } from 'azeriand-library'
import { Checkbox } from 'azeriand-library'
import { useState } from 'react'

export default function RowSet({num, reps, kg, onRepsChange, onKgChange}){
    const [repsCopy] = useState(reps);
    const [kgCopy] = useState(kg);
    return(
        <>
            <Input className='w-full' noPadding disabled placeholder={num}/>
            <Input className='w-full' noPadding disabled placeholder={reps !== '' ? `${repsCopy} x ${kgCopy} Kg` : ''}/>
            <Input className='w-full' noPadding type='number' placeholder='0' value={reps} onChange={onRepsChange}/>
            <Input className='w-full' noPadding type='number' placeholder='0' value={kg} onChange={onKgChange}/>
            <Checkbox/>
        </>
    )
}