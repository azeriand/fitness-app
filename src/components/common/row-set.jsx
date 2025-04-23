
import Input from './input'
import Checkbox from './checkbox'

export default function RowSet(){
    return(
        <>
            <Input noPadding disabled placeholder='1' fullWidth/>
            <Input noPadding disabled placeholder='Previous' fullWidth/>
            <Input noPadding type='number' fullWidth/>
            <Input noPadding type='number' fullWidth/>
            <Checkbox/>
        </>
    )
}