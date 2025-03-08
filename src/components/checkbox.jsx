import Button from './button'
import './checkbox.css'
import { FaCheck } from "react-icons/fa";
import { useState } from 'react';

export default function Checkbox({label, checkedDefault = false, onChange}){
    const [checked, setChecked] = useState(checkedDefault)

    function checkboxClicked(){
        const newValue = !checked
        setChecked(newValue);
        onChange(newValue);
    }

    return(
        <div className='check' onClick={checkboxClicked}>
                <Button icon={checked ? <FaCheck/> : null }>
                </Button>
                {label}
        </div>
    )
}