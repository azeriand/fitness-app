
import Input from './input'
import Checkbox from './checkbox'

export default function RowSet(){
    return(
        <>
            <Input className='w-full' noPadding disabled placeholder='1'/>
            <Input className='w-full' noPadding disabled placeholder='Previous'/>
            <Input className='w-full' noPadding type='number'/>
            <Input className='w-full' noPadding type='number'/>
            <Checkbox/>
        </>
    )
}