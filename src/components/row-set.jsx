
import { Input, Checkbox} from 'azeriand-library'
import { useState, useContext } from 'react'
import { SettingsContext } from './settings-context'

export default function RowSet({num, reps, kg, onRepsChange, onKgChange}){
    
    const { defaultWeightUnit, calculateToIbs } = useContext(SettingsContext);

    const [repsCopy] = useState(reps);
    const [kgCopy] = useState(kg);

    return(
        <>
            <Input centerText className='w-full' noPadding disabled placeholder={num}/>
            <Input className='w-full' noPadding disabled placeholder={reps !== '' ? `${repsCopy} x ${calculateToIbs(kgCopy)} ${defaultWeightUnit}` : ''}/>
            <Input className='w-full' noPadding type='number' placeholder='0' value={reps} onChange={onRepsChange}/>
            <Input className='w-full' noPadding type='number' placeholder='0' value={calculateToIbs(kg)} onChange={onKgChange}/>
            <Checkbox/>
        </>
    )
}